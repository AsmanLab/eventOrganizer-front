import { TStandApplication } from "./types";
import { TEventLayout } from "./event-layout";
import { TSpeaker } from "./speaker";
import { TSponsor } from "./sponsor";

export type TFestivalReport = {
  title: string;
  visitor_count: number;
  speakers: number;
  stand_applications: number;
  sponsors: number;
};

export type TFestival = {
  id: string;
  title: string;
  short_description: string | null;
  description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  report: TFestivalReport;
  image?: string | null;
  media_files?: any[] | null;
};

export type TFestivalDto = {
  festival: TFestival;
  sponsors?: TSponsor[];
  event_layout?: TEventLayout | null;
  visitors?: number;
  stand_applications: TStandApplication[];
  speakers: TSpeaker[];
};
