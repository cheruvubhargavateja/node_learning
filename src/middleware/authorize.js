import jwt from "jsonwebtoken";
import { configs } from "../config.js";

export const authorize = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if(authHeader)
  {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, configs.token_secret, (err, user) => {
      if(err) res.status(403).json({message:"Token is expired"})
      req.user = user;
      next()
    }
    )
  }
  else{
    res.status(401).json({message:"Token is Invalid"})
  }
}

