import { ArrowUpRight, Globe, Mail, MessageCircle } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "./brand-icons";
import type { ContactChannel, ContactChannelKey } from "@/content/contact";

type IconCmp = React.ComponentType<React.ComponentProps<"svg">>;

const ICONS: Record<ContactChannelKey, IconCmp> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  website: Globe,
};

export function ContactChannels({ channels }: { channels: ContactChannel[] }) {
  if (channels.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {channels.map((ch) => {
        const Icon = ICONS[ch.key];
        const isExternal = !ch.href.startsWith("mailto:");
        return (
          <li key={ch.href}>
            <a
              href={ch.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group/ch flex items-center gap-3 rounded-xl ring-1 ring-foreground/10 hover:ring-primary/40 p-4 bg-card transition-all"
            >
              <div className="rounded-lg bg-primary/10 text-primary p-2.5 group-hover/ch:bg-primary group-hover/ch:text-primary-foreground transition-colors">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover/ch:text-primary transition-colors">
                  {ch.label}
                </p>
                {ch.hint && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {ch.hint}
                  </p>
                )}
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover/ch:opacity-100 group-hover/ch:translate-x-0 transition-all" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
