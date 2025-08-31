"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

// Example optimistic update for favorites (future feature)
interface FavoriteUpdate {
  id: number;
  type: "movie" | "series";
  isFavorite: boolean;
}

export function useOptimisticUpdates() {
  const queryClient = useQueryClient();

  // Optimistic favorite toggle
  const toggleFavorite = useMutation({
    mutationFn: async ({ id, type, isFavorite }: FavoriteUpdate) => {
      // This would be the actual API call in the future
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/favorites/${type}/${id}`;
      const response = await fetch(apiUrl, {
        method: isFavorite ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      return { id, type, isFavorite };
    },
    onMutate: async ({ id, type, isFavorite }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(["favorites"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["favorites"], (old: any) => {
        if (!old) return old;
        
        const updated = old.map((item: any) => 
          item.id === id && item.type === type 
            ? { ...item, isFavorite } 
            : item
        );
        
        return updated;
      });

      // Return a context object with the snapshotted value
      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Optimistic watchlist toggle
  const toggleWatchlist = useMutation({
    mutationFn: async ({ id, type, inWatchlist }: { id: number; type: "movie" | "series"; inWatchlist: boolean }) => {
      // This would be the actual API call in the future
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/watchlist/${type}/${id}`;
      const response = await fetch(apiUrl, {
        method: inWatchlist ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update watchlist");
      }

      return { id, type, inWatchlist };
    },
    onMutate: async ({ id, type, inWatchlist }) => {
      await queryClient.cancelQueries({ queryKey: ["watchlist"] });

      const previousWatchlist = queryClient.getQueryData(["watchlist"]);

      queryClient.setQueryData(["watchlist"], (old: any) => {
        if (!old) return old;
        
        const updated = old.map((item: any) => 
          item.id === id && item.type === type 
            ? { ...item, inWatchlist } 
            : item
        );
        
        return updated;
      });

      return { previousWatchlist };
    },
    onError: (err, variables, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(["watchlist"], context.previousWatchlist);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  return {
    toggleFavorite,
    toggleWatchlist,
  };
}
