"use client";

import superjson from "superjson";
import { trpc } from "@/app/_trpc/client";
import { absoluteUrl } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren, useState } from "react";
import { toast } from "sonner";

const Providers = ({ children, ...props }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error) => {
              const { message } = error;

              toast.error(message);
            },
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
