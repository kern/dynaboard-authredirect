import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";

export const verifyState = (oauthState: string) => {
  // if state is a JWT, it's coming from an app
  const decoded = jwt.decode(oauthState, { complete: true });
  if (decoded && decoded.payload) {
    try {
      jwt.verify(oauthState, JWT_SECRET, { algorithms: ["HS256"] });
    } catch (e: any) {
      throw new Error("Unable to verify token");
    }
  }
};
