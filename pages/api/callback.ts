import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const oauthState = req.query["state"] as string | undefined;
  if (!oauthState) {
    throw new Error("Do not know where to redirect you");
  }

  try {
    jwt.verify(oauthState, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (e: any) {
    throw new Error("Unable to verify token");
  }

  const endpointURL = req.cookies[oauthState];
  if (!endpointURL) {
    throw new Error("Seriously do not know where to redirect you");
  }

  const url = new URL(endpointURL);
  Object.entries(req.query).forEach(([key, value]) =>
    url.searchParams.append(key, value as string)
  );
  setCookie(res, oauthState, endpointURL.toString(), {
    maxAge: -60, // delete the cookie
  });
  res.redirect(url.toString());
}
