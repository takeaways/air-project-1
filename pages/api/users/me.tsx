import { NextApiRequest, NextApiResponse } from "next";

import client from "libs/server/client";
import withHandler from "libs/server/withHandler";
import { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.status(200).json({
    ok: true,
    ...profile,
  });
}

export default withApiSession(withHandler("GET", handler));