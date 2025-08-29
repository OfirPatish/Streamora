"use client";

import { useState } from "react";
import { CacheDebugger } from "./CacheDebugger";
import { GlobalDataDebugger } from "./GlobalDataDebugger";
import { ApiTester } from "./ApiTester";

export function DebugModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
    // Force a refresh of debug data when modal opens
    setRefreshKey((prev) => prev + 1);
  };

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="fixed bottom-4 right-4 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white px-3 py-2 rounded-full shadow-lg z-50 text-xs border border-gray-600/50 backdrop-blur-sm transition-all duration-200"
        title="Open debug panel to monitor API calls, cache status, and global data"
      >
        🐛
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">🐛 Streamora Debug Panel</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-2xl">
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Compact Header Info */}
              <div className="mb-4 p-2 bg-blue-900/20 border border-blue-700 rounded text-xs text-blue-300">
                <strong>💡 Debug Panel:</strong> Monitor API calls, cache status, and global data. Data is fetched once
                and shared across components.
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Left Column - Status & Cache */}
                <div className="space-y-4">
                  {/* Global Data Status */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <h3 className="text-sm font-semibold text-green-400 mb-2">🌐 Global Data</h3>
                    <GlobalDataDebugger refreshKey={refreshKey} />
                  </div>

                  {/* Cache Debugger */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <h3 className="text-sm font-semibold text-purple-400 mb-2">💾 Cache</h3>
                    <CacheDebugger refreshKey={refreshKey} />
                  </div>
                </div>

                {/* Right Column - API Tester & Quick Actions */}
                <div className="xl:col-span-2 space-y-4">
                  {/* API Tester */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <h3 className="text-sm font-semibold text-blue-400 mb-2">🔧 API Tester</h3>
                    <div className="text-xs text-gray-400 mb-2">Test backend connectivity</div>
                    <ApiTester />
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <h3 className="text-sm font-semibold text-yellow-400 mb-2">⚡ Quick Actions</h3>
                    <div className="text-xs text-gray-400 mb-3">Common debugging operations</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors"
                        title="Clears all cached data and reloads the page"
                      >
                        🗑️ Clear Cache
                      </button>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                        title="Reloads the entire page"
                      >
                        🔄 Refresh Page
                      </button>
                      <button
                        onClick={() => {
                          const event = new CustomEvent("refreshGlobalData");
                          window.dispatchEvent(event);
                        }}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                        title="Re-fetches all global data"
                      >
                        🌐 Refresh Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
