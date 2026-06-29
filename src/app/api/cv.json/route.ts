import { getCv } from "@/content/cv";

export async function GET() {
  return Response.json(getCv(), {
    headers: { "cache-control": "public, max-age=300, s-maxage=300" },
  });
}
