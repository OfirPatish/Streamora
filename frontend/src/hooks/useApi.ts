"use client";

import { useState, useEffect } from "react";
import { apiClient, ApiError } from "@/lib/api";

// Generic API hook state
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic API hook
export function useApi<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  immediate: boolean = true
): ApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiClient.get<{ success: boolean; data: T; timestamp: string }>(endpoint, params);
      // Extract the actual data from the backend's ApiResponse wrapper
      const data = response.data;
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "An unexpected error occurred";

      setState({ data: null, loading: false, error: errorMessage });
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [endpoint, JSON.stringify(params), immediate]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Async function hook for manual API calls
export function useAsyncApi<T>(): {
  execute: (endpoint: string, params?: Record<string, string | number>) => Promise<T>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (endpoint: string, params?: Record<string, string | number>): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<{ success: boolean; data: T; timestamp: string }>(endpoint, params);
      // Extract the actual data from the backend's ApiResponse wrapper
      const data = response.data;
      return data;
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "An unexpected error occurred";

      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
