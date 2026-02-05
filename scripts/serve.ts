import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = path.join(publicDir, pathname);
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    return new Response(file, { headers: { "Content-Type": contentType } });
  },
});

console.log(`Server running on http://localhost:${server.port}`);
