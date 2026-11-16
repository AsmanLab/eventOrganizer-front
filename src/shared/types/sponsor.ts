export type TSponsorStatus = "bronze" | "silver" | "gold";

export type TSponsorDto = {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  occupation: string;
  project_name: string;
  social_network_links?: string;
  help_offer: string;
  status: TSponsorStatus;
  logo?: string | null;
};

export type TSponsor = {
  id: string;
  festival: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  occupation: string;
  project_name: string;
  description?: string | null;
  social_network_links?: string;
  help_offer: string;
  status: TSponsorStatus;
  is_confirmed?: boolean;
  logo?: string | null;
  type?: "sponsor";
  created_at: Date;
};
