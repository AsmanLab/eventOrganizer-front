import { TSpeaker } from "./speaker";
import { TSponsor } from "./sponsor";

export type TStandApplication = {
  festival: string;
  id: number;
  last_name: string;
  first_name: string;
  middle_name?: string;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  occupation: string;
  project_name: string;
  needs_electricity: boolean;
  needs_water: boolean;
  created_at: Date;
  is_confirmed?: boolean;
  stand: string;
  stand_status: string;
};

export type TApplication = TSpeaker | TSponsor | TStandApplication;

export type TApplicationList = TApplication[];

export type TMediaFile = {
  id: number;
  festival: string;
  file: string | null;
  file_type: string;
  video_link: string | null;
};
