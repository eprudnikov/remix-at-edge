import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getServerIPs } from "./iplocation";

export const links: LinksFunction = () => {
  return [
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix at Edge",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  ips: Awaited<ReturnType<typeof String>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    ips: await getServerIPs(),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
