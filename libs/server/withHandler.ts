import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: Method;
  handler: Handler;
  isPrivate?: boolean;
}

type Method = "GET" | "POST" | "DELETE";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
export default function withHandler({
  isPrivate = true,
  method,
  handler,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (isPrivate && !req.session.user) {
      return res.status(401).json({
        ok: false,
        error: "로그인 부탁드립니다.",
      });
    }

    if (req.method !== method) {
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
