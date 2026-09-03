import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,

        throwOnError: false, // Important: Don't throw errors for tests
      },
      mutations: {
        retry: false,
        throwOnError: false,
      },
    },
  });
}

interface WrapperProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export function createWrapper(queryClient?: QueryClient) {
  const client = queryClient || createTestQueryClient();

  return function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  };
}

export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
