import { JwtPayload as Payload } from "jsonwebtoken";

export interface JwtPayload extends Payload {
  acr: string;
  aio: string;
  amr: string[];
  appid: string;
  appidacr: string;
  family_name: string;
  given_name: string;
  ipaddr: string;
  name: string;
  oid: string;
  onprem_sid: string;
  rh: string;
  roles: string[];
  scp: string;
  tid: string;
  unique_name: string;
  upn: string;
  uti: string;
  ver: string;
};
