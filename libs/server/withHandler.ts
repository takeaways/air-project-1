import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type Method = "GET" | "POST" | "DELETE";
interface ConfigType {
  methods: Method[];
  handler: Handler;
  isPrivate?: boolean;
}

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
export default function withHandler({
  isPrivate = true,
  methods,
  handler,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (isPrivate && !req.session.user) {
      return res.status(401).json({
        ok: false,
        error: "로그인 부탁드립니다.",
      });
    }

    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  };
}
