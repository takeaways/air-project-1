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
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const post = await client.post.findFirst({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (!post) {
    return res.status(404).json({
      ok: false,
    });
  }

  await client.answer.create({
    data: {
      answer,
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  return res.status(201).json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET", "DELETE"],
    handler,
  }),
);
