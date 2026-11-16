export type TParticipant = {
  festival: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  professional_status: string;
  visit_purposes: number[];
  qr_code_url?: string;
  status?: string;
};

export type TVisitPurpose = {
  id: number;
  name: string;
};

export type TParticipantDetails = {
  festival: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  professional_status: string;
  visit_purposes: TVisitPurpose[];
  qr_code_url?: string;
  status?: string;
};
