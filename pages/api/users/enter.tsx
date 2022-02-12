import main from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

import client from "libs/server/client";
import withHandler from "libs/server/withHandler";
import { ResponseType } from "libs/server/withHandler";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
main.setApiKey(process.env.SENDGRID_API_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    body: { phone, email },
  } = req;

  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({ ok: false });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // const token = await client.token.create({
  //   data: {
  //     payload,
  //     user: {
  //       connectOrCreate: {
  //         where: {
  //           ...user,
  //         },
  //         create: {
  //           name: "Anonymouse",
  //           ...user,
  //         },
  //       },
  //     },
  //   },
  // });

  if (phone) {
    // await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
  } else if (email) {
    // const email = await main.send({
    //   from: "jgi0105@naver.com",
    //   to: "jgi0105@naver.com",
    //   subject: "geonil jang",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
  }

  res.status(201).json({ ok: true });
}

export default withHandler({
  methods: ["POST", "GET", "DELETE"],
  handler,
  isPrivate: false,
});
