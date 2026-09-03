import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock with dynamic params
  http.get("/api/cases/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      success: true,
      data: {
        id,
        familyName: "Smith",
        deceasedName: "John Smith",
        status: "OPEN",
      },
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
