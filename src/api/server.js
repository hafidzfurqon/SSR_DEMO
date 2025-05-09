import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, "..", p);

// Create express app
const app = express();

// Determine if we're in production
const isProduction = process.env.NODE_ENV === "production";

export default async (req, res) => {
  try {
    const url = req.url;

    let template, render;

    if (isProduction) {
      // In production, use the built files
      template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
      render = (await import(resolve("dist/server/entry-server.js"))).render;
    } else {
      // In development, create a Vite dev server
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
        root: resolve("./"),
      });

      // Use vite's connect instance as middleware
      app.use(vite.middlewares);

      template = fs.readFileSync(resolve("index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    }

    // Render the app
    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    // Send the rendered HTML
    res.status(200);
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    console.error(e);
    res.status(500).end(e.stack);
  }
};
