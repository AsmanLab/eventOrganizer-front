// export type TStandApplication = {
//   id?: number;
//   last_name: string;
//   first_name: string;
//   middle_name?: string | null;
//   phone_number: string;
//   email: string;
//   country: string;
//   city: string;
//   occupation: string;
//   project_name: string;
//   needs_electricity: boolean;
//   needs_water: boolean;
// };

export type TSpotStatus = "available" | "booked" | "occupied";

export type TStand = {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: TSpotStatus;
  description: string | null;
};

export type TEventLayout = {
  id: number;
  width: number;
  height: number;
  bg_image?: string | null;
  stands?: TStand[] | null;
};

export type TEventLayoutDto = TEventLayout & {
  festival?: number;
  festival_title?: string;
};
