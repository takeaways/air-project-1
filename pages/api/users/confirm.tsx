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

  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!foundToken) {
    return res.status(404).end();
  }

  req.session.user = {
    id: foundToken.userId,
  };

  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET", "DELETE"],
    handler,
    isPrivate: false,
  }),
);
