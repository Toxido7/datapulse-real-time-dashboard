import { QueryClient } from "@tanstack/react-query";

export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry(failureCount, error) {
          const status =
            typeof error === "object" && error !== null && "status" in error
              ? Number((error as { status?: number }).status)
              : undefined;

          if (status !== undefined && status >= 400 && status < 500 && status !== 429) {
            return false;
          }

          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
