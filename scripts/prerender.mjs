/**
 * Post-build prerender script.
 * Spins up a static server from dist/, visits each route with Puppeteer,
 * and writes the fully-rendered HTML back to dist/<route>/index.html.
 */
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
import puppeteer from "puppeteer";

const DIST = join(process.cwd(), "dist");
const PORT = 4173;
const ROUTES = [
  "/",
  "/about",
  "/fun",
  "/poreia",
  "/case-study/thesisflow",
  "/case-study/quantumpdf",
  "/case-study/data-notebook",
];

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
};

function serve() {
  const fallback = readFileSync(join(DIST, "index.html"));

  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = req.url.split("?")[0];
      const filePath = join(DIST, url);

      if (existsSync(filePath) && extname(filePath)) {
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        res.end(readFileSync(filePath));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fallback);
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log("\n⚡ Pre-rendering routes...\n");

  const server = await serve();
  const browser = await puppeteer.launch({ headless: true });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    console.log(`  Rendering ${route}`);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Wait a bit for animations / lazy content
    await page.waitForSelector("#root", { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 2000));

    const html = await page.content();
    await page.close();

    // Write to dist/<route>/index.html
    const dir = route === "/" ? DIST : join(DIST, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const outFile = route === "/" ? join(DIST, "index.html") : join(dir, "index.html");
    writeFileSync(outFile, html, "utf-8");
    console.log(`  Wrote ${outFile.replace(process.cwd(), ".")}`);
  }

  await browser.close();
  server.close();
  console.log("\n  Pre-rendering complete!\n");
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
