export interface User {
  displayName: string;
  status: string | "online";
  uid: string;
  createdAt: string;
  avatar?: string;
  email?: string;
}
