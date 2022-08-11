import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const oauthState = req.query["state"] as string | undefined;
  if (!oauthState) {
    throw new Error("Do not know where to redirect you");
  }
  const buffer = Buffer.from(oauthState, "base64");
  const url = new URL(buffer.toString("utf8"));
  Object.entries(req.query).forEach(([key, value]) =>
    url.searchParams.append(key, value as string)
  );
  res.redirect(url.toString());
}
