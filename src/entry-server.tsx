import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
// import {  } from "react-helmet-async";
// import helmetAsync from "react-helmet-async";
// const { HelmetProvider } = helmetAsync;
// HelmetProvider
export function render(_url: string) {
  const helmetContext = {} as any;

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `,
  };
}
