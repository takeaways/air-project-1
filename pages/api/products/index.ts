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
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      image: "xx",
      description,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.status(200).json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({
    method: "POST",
    handler,
  }),
);
