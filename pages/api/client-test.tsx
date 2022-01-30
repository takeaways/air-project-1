import { NextApiRequest, NextApiResponse } from "next";

import client from "libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await client.user.create({
    data: {
      email: "122222",
      name: "222111",
    },
  });

  res.json({
    ok: true,
    data: "hello world1",
  });
}
