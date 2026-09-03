import "@testing-library/jest-dom";
import { vi } from "vitest";
import { server } from "./src/mocks/server";

// Start MSW before all tests
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image optimization
vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.stubGlobal("fetch", vi.fn());

afterEach(() => {
  vi.clearAllMocks();
});
