export const ADMIN_AUTH_STORAGE_KEY = "catalog-admin-auth";

type AdminAccount = {
  email: string;
  password: string;
  role: "admin";
};

// Manual admin record (no signup flow).
const ADMIN_ACCOUNTS_DB: AdminAccount[] = [
  {
    email: "ritendratam404@gmail.com",
    password: "admin@123",
    role: "admin",
  },
];

export function validateAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return ADMIN_ACCOUNTS_DB.some(
    (account) => account.email.toLowerCase() === normalizedEmail && account.password === password
  );
}

export function setAdminAuthenticated(value: boolean) {
  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, value ? "true" : "false");
}

export function getAdminAuthenticated() {
  return localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "true";
}

export function clearAdminAuthenticated() {
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}