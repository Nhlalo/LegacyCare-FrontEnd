import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === "test@test.com" && password === "password123") {
      return HttpResponse.json({
        success: true,
        data: {
          user: { id: "1", email, firstName: "John", lastName: "Doe" },
          accessToken: "mock-token",
        },
      });
    }

    return new HttpResponse(
      JSON.stringify({ success: false, error: "Invalid credentials" }),
      { status: 401 },
    );
  }),

  http.get("/api/cases", () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: "1",
          familyName: "Smith",
          deceasedName: "John Smith",
          status: "OPEN",
        },
        {
          id: "2",
          familyName: "Johnson",
          deceasedName: "Mary Johnson",
          status: "CLOSED",
        },
      ],
    });
  }),

  // Simulate loading state (slow response)
  http.get("/api/slow", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return HttpResponse.json({ success: true, data: "Slow response" });
  }),

  // Simulate error
  http.get("/api/error", () => {
    return new HttpResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 },
    );
  }),
];
