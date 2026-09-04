import { http, HttpResponse } from "msw";

const API_BASE_URL = "http://localhost:5000";

export const handlers = [
  http.post(`${API_BASE_URL}/api/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email === "test@test.com" && password === "password123") {
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            id: "1",
            email,
            firstName: "John",
            lastName: "Doe",
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
          accessToken: "mock-token",
        },
      });
    }

    return new HttpResponse(
      JSON.stringify({ success: false, error: "Invalid credentials" }),
      { status: 401 },
    );
  }),

  http.post(`${API_BASE_URL}/api/auth/register`, async ({ request }) => {
    const { email, password, firstName, lastName } = (await request.json()) as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "1",
          email,
          firstName,
          lastName,
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
        },
        accessToken: "mock-token",
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/auth/refresh`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        accessToken: "new-mock-token",
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/auth/logout`, () => {
    return HttpResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  }),

  http.get(`${API_BASE_URL}/api/cases`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: "1",
          familyName: "Smith",
          deceasedName: "John Smith",
          status: "OPEN",
          type: "AT_NEED",
          totalAmount: 5000,
          paidAmount: 2000,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          familyName: "Johnson",
          deceasedName: "Mary Johnson",
          status: "CLOSED",
          type: "AT_NEED",
          totalAmount: 3000,
          paidAmount: 3000,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    });
  }),

  http.get(`${API_BASE_URL}/api/cases/:id`, ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      success: true,
      data: {
        id,
        familyName: "Smith",
        deceasedName: "John Smith",
        status: "OPEN",
        type: "AT_NEED",
        totalAmount: 5000,
        paidAmount: 2000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/cases/at-need`, async ({ request }) => {
    const body = (await request.json()) as object;
    return HttpResponse.json({
      success: true,
      data: {
        id: "3",
        ...body,
        status: "OPEN",
        type: "AT_NEED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  http.post(`${API_BASE_URL}/api/cases/generate-link`, async ({ request }) => {
    const { caseId } = (await request.json()) as { caseId: string };
    return HttpResponse.json({
      success: true,
      data: {
        token: `mock-token-${caseId}`,
        link: `http://localhost:3000/case/mock-token-${caseId}`,
      },
    });
  }),

  http.get(`${API_BASE_URL}/api/dashboard/overview`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalCases: 10,
        openCases: 5,
        preNeedCases: 2,
        atNeedCases: 8,
        totalRevenue: 15000,
        staffCount: 3,
      },
    });
  }),

  http.get(`${API_BASE_URL}/api/staff`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: "1",
          userId: "u1",
          role: "OWNER",
          active: true,
          user: {
            id: "u1",
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
          invitedAt: new Date().toISOString(),
          acceptedAt: new Date().toISOString(),
        },
        {
          id: "2",
          userId: "u2",
          role: "STAFF",
          active: true,
          user: {
            id: "u2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane@test.com",
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
          },
          invitedAt: new Date().toISOString(),
          acceptedAt: new Date().toISOString(),
        },
      ],
    });
  }),

  http.post(`${API_BASE_URL}/api/staff/invite`, async ({ request }) => {
    const { email, role } = (await request.json()) as {
      email: string;
      role: string;
    };
    return HttpResponse.json({
      success: true,
      data: {
        id: "3",
        userId: "u3",
        role,
        active: true,
        user: {
          id: "u3",
          firstName: "Pending",
          lastName: "User",
          email,
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
        },
        invitedAt: new Date().toISOString(),
        acceptedAt: null,
      },
    });
  }),
];
