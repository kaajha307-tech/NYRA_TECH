import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NYGENX  — AI-Powered Business Operating System" },
      { name: "description", content: "Premium AI, ERP, website development, creative, and cloud capabilities unified into one futuristic operating system for ambitious teams." },
      { name: "keywords", content: "NYGENX , Nyaya, Nyaya OS, business intelligence, enterprise resource planning, ERP solutions, AI agents, creative production studio, cloud infrastructure, website development" },
      { name: "author", content: "NYGENX " },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "NYGENX  — AI-Powered Business Operating System" },
      { property: "og:description", content: "Premium AI, ERP, website development, creative, and cloud capabilities unified into one futuristic operating system for ambitious teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@NYGENX " },
      { name: "twitter:title", content: "NYGENX  — AI-Powered Business Operating System" },
      { name: "twitter:description", content: "Premium AI, ERP, website development, creative, and cloud capabilities unified into one futuristic operating system for ambitious teams." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d1d8e8d0-6112-420c-8ada-ca3c31fe6015/id-preview-7f6c517b--a34fe2cd-3c99-4445-b5a2-c60c7f9afa71.lovable.app-1781965089630.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d1d8e8d0-6112-420c-8ada-ca3c31fe6015/id-preview-7f6c517b--a34fe2cd-3c99-4445-b5a2-c60c7f9afa71.lovable.app-1781965089630.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NYGENX ",
              "url": "https://NYGENX .com",
              "logo": "https://NYGENX .com/assets/nyaya-logo.png",
              "description": "NYGENX  is a unified intelligence layer powering ambitious teams, integrating website development, custom ERP solutions, creative VFX production, and fine-tuned AI workflows.",
              "sameAs": [
                "https://github.com/Gokul2004-ne/NYGENX _website"
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
