import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "geonilairsession",
  password: "6~tqxGf)%Z_kyQejug:LMrSJJY9}LpP3fY!/*;Q!",
};

export function withApiSession(fn: any) {
  console.log("--");
  return withIronSessionApiRoute(fn, cookieOptions);
}
