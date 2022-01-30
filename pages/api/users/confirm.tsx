import { NextApiRequest, NextApiResponse } from "next";

import client from "libs/server/client";
import withHandler from "libs/server/withHandler";
import { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    body: { token },
  } = req;

  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) {
    return res.status(404).end();
  }

  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withApiSession(withHandler("POST", handler));
