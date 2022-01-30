import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type Method = "GET" | "POST" | "DELETE";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
export default function withHandler(method: Method, handler: Handler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
      return;
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
