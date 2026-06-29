#!/bin/bash
set -e

CONTAINER_NAME=$(basename "$(pwd)")

# Procura uma porta TCP livre no host, começando em 3000.
find_free_port() {
  local port=${1:-3000}
  while :; do
    if ! (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; then
      echo "$port"
      return 0
    fi
    exec 3>&- 2>/dev/null || true
    port=$((port + 1))
  done
}

PORT=$(find_free_port 3000)

HOST_UID=$(id -u)
HOST_GID=$(id -g)
HOST_USER=$(id -un)

echo "Starting Node container with host access enabled (port $PORT)..."

docker run --rm -it --init \
  --name "$CONTAINER_NAME" \
  -e HOST_UID=$HOST_UID \
  -e HOST_GID=$HOST_GID \
  -e HOST_USER=$HOST_USER \
  -e CONTAINER_NAME=$CONTAINER_NAME \
  -e PORT=$PORT \
  -v "$CONTAINER_NAME-home":/home/$HOST_USER \
  -v "$(pwd)":/home/$HOST_USER/$CONTAINER_NAME \
  -w /home/$HOST_USER/$CONTAINER_NAME \
  -p $PORT:$PORT \
  --add-host=host.docker.internal:host-gateway \
  node:latest bash -c '
    set -e
    existing_group=$(getent group  "$HOST_GID" | cut -d: -f1 || true)
    if [ -n "$existing_group" ] && [ "$existing_group" != "$HOST_USER" ]; then
      groupmod -n "$HOST_USER" "$existing_group"
    fi
    existing_user=$(getent passwd "$HOST_UID" | cut -d: -f1 || true)
    if [ -n "$existing_user" ] && [ "$existing_user" != "$HOST_USER" ]; then
      usermod -l "$HOST_USER" -d /home/"$HOST_USER" "$existing_user"
    fi
    getent group  "$HOST_GID" >/dev/null || groupadd -g "$HOST_GID" "$HOST_USER"
    getent passwd "$HOST_UID" >/dev/null || useradd  -u "$HOST_UID" -g "$HOST_GID" -d /home/"$HOST_USER" -s /bin/bash "$HOST_USER"
    chown -R "$HOST_UID:$HOST_GID" /home/"$HOST_USER"
    export HOME="/home/$HOST_USER"
    export USER="$HOST_USER"
    export PORT="$PORT"
    cd "$HOME/$CONTAINER_NAME"
    exec setpriv --reuid="$HOST_UID" --regid="$HOST_GID" --init-groups env PORT="$PORT" bash -il
  '