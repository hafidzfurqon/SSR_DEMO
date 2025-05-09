import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import sirv from "sirv";
import compression from "compression";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const resolve = (p) => path.resolve(__dirname, "..", p);

// Yang perlu diimport dari build SSR
const mainServer = async (req, res) => {
  const app = express();

  // Middleware
  app.use(compression());
  app.use(
    sirv(resolve("dist/client"), {
      extensions: [],
      gzip: true,
    })
  );

  // Serve assets
  app.use("/assets", express.static(resolve("dist/client/assets")));

  // Server-side rendering
  const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");
  const { render } = await import("../dist/server/entry-server.js");

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const { html: appHtml, head } = await render(url);

      const html = template
        .replace("<!--head-outlet-->", head || "")
        .replace("<!--app-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      console.error(e);
      res.status(500).end(e.stack);
    }
  });

  // Delegasi ke express untuk handling
  return app(req, res);
};

export default mainServer;
