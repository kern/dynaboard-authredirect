import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const oauthState = req.query["state"] as string | undefined;
  if (!oauthState) {
    throw new Error("Do not know where to redirect you");
  }
  const url = new URL(oauthState);
  Object.entries(req.query).forEach(([key, value]) =>
    url.searchParams.append(key, value as string)
  );
  res.redirect(url.toString());
}
