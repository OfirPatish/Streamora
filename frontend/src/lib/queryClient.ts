import { QueryClient } from "@tanstack/react-query";

// Create the query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests up to 2 times
      retry: (failureCount, error) => {
        // Don't retry if it's a user-friendly error
        if (error.message.includes("Unable to load") || error.message.includes("Something went wrong")) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus to reduce API calls
      refetchOnWindowFocus: false,

      // Don't refetch on mount if data is fresh
      refetchOnMount: false,

      // Don't refetch on reconnect
      refetchOnReconnect: false,
    },
  },
});

// Client-side persistence setup
if (typeof window !== "undefined") {
  // Import dynamically to avoid SSR issues
  import("@tanstack/query-sync-storage-persister").then(({ createSyncStoragePersister }) => {
    import("@tanstack/react-query-persist-client").then(({ persistQueryClient }) => {
      const persister = createSyncStoragePersister({
        storage: window.localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      });

      persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        buster: "v1", // Cache buster for app updates
      });
    });
  });
}
