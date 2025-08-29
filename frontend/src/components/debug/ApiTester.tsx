"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api";

export function ApiTester() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/movies/popular");
      setResult(response);
      console.log("✅ API Test successful:", response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("❌ API Test failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="space-y-2">
      <button
        onClick={testApi}
        disabled={loading}
        className="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test API"}
      </button>

      {error && <div className="text-red-400 text-xs">Error: {error}</div>}

      {result && <div className="text-green-400 text-xs">Success: {result.results?.length || 0} movies</div>}
    </div>
  );
}
