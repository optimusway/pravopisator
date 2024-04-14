import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./global.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:url" content="https://pravopisator.pages.dev/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Правописатор – Помогатор по правописанию"
        />
        <meta
          property="og:description"
          content="Правописатор исправляет ошибки и опечатки, расставляет запятые и знаки препинания."
        />
        <meta
          property="og:image"
          content="https://pravopisator.pages.dev/og.svg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="pravopisator.pages.dev" />
        <meta
          property="twitter:url"
          content="https://pravopisator.pages.dev/"
        />
        <meta
          name="twitter:title"
          content="Правописатор – Помогатор по правописанию"
        />
        <meta
          name="twitter:description"
          content="Правописатор исправляет ошибки и опечатки, расставляет запятые и знаки препинания."
        />
        <meta
          name="twitter:image"
          content="https://pravopisator.pages.dev/og.svg"
        />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Theme accentColor="green">
      <Outlet />
    </Theme>
  );
}
