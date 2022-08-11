import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorizationUrl = req.query["authorizationUrl"] as string | undefined;
  if (!authorizationUrl) {
    throw new Error("No authorization URL set");
  }
  res.redirect(authorizationUrl);
}
