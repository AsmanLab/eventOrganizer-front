export type User = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_active: boolean;
};

export type AuthResponse = User & {
  access_token: string;
  refresh_token: string;
};
