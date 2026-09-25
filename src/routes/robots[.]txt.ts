import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `User-agent: *
Allow: /
Sitemap: ${new URL("/sitemap.xml", site.url).href}
`,
          {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          },
        ),
    },
  },
});
