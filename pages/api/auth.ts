import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";
import { verifyState } from "../../utils/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const encodedAuthURL = req.query["encodedAuthURL"] as string | undefined;
  const encodedEndpointURL = req.query["encodedEndpointURL"] as
    | string
    | undefined;
  if (!encodedAuthURL) {
    throw new Error("No authorization URL set");
  }
  // console.log(encodedAuthURL);
  const authorizationURL = new URL(
    Buffer.from(encodedAuthURL, "base64").toString()
  );
  const endpointURL = new URL(
    Buffer.from(encodedEndpointURL, "base64").toString()
  );
  console.log("authorizationURL", authorizationURL.toString());
  console.log("endpointURL", authorizationURL.toString());

  verifyState(authorizationURL.searchParams.get("state"));

  setCookie(
    res,
    authorizationURL.searchParams.get("state"),
    endpointURL.toString(),
    {
      maxAge: 60, // expire in 60 seconds
    }
  );
  res.redirect(authorizationURL.toString());
}
