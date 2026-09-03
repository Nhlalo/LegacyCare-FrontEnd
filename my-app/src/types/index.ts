export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface FuneralHome {
  id: string;
  name: string;
  subdomain: string;
  domain: string | null;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
}

export interface Staff {
  id: string;
  userId: string;
  role: "OWNER" | "MANAGER" | "STAFF" | "LIMITED";
  active: boolean;
  user: User;
  invitedAt: string;
  acceptedAt: string | null;
}

export interface Case {
  id: string;
  funeralHomeId: string;
  type: "PRE_NEED" | "AT_NEED";
  status: "OPEN" | "IN_PROGRESS" | "READY" | "CLOSED";
  familyName: string;
  deceasedName: string | null;
  serviceDate: string | null;
  serviceLocation: string | null;
  totalAmount: number;
  paidAmount: number;
  familyAccessToken: string | null;
  linkExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  payments?: Payment[];
}

export interface Payment {
  id: string;
  caseId: string;
  amount: number;
  method: "CREDIT_CARD" | "DEBIT_CARD" | "EFT" | "CASH" | "DEBIT_ORDER";
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  reference: string | null;
  transactionId: string | null;
  createdAt: string;
}

export interface PaymentStatus {
  total: number;
  paid: number;
  remaining: number;
  isFullyPaid: boolean;
}

export interface DashboardStats {
  totalCases: number;
  openCases: number;
  preNeedCases: number;
  atNeedCases: number;
  totalRevenue: number;
  staffCount: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
