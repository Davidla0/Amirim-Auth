import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { verifyJwt } from "../utils/jwt";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  const accessToken = (req.headers.cookie || "").replace(
    "token=",
    ""
  );
    
  if (!accessToken) {
      res.locals.user = false
      console.log(res.locals);
    return next()
  }

  const decoded = verifyJwt(accessToken, "accessTokenPrivateKey");

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;