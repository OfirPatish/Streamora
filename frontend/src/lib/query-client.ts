import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 6, // 6 hours (default for any unconfigured queries)
      gcTime: 1000 * 60 * 60 * 12, // 12 hours
      retry: (failureCount, error) => {
        // Don't retry if it's a user-friendly error
        if (error.message.includes("Unable to load") || error.message.includes("Something went wrong")) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});
