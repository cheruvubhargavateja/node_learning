import Users from "../models/userModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"
import { configs } from "../config.js";

export default async (req, res) =>
{

  const { username, email, password } = req.body;

  const encryptedPass = CryptoJS.AES
    .encrypt(password, configs.token_secret).toString();

  const users = new Users({
    username,
    email,
    password : encryptedPass
  });

  try
  {
    const saved = await users.save();
    const {password, __v, ...others} = saved._doc;
    const accessToken = jwt.sign({
      id: users._id,
      email: users.email
    },
    configs.token_secret,
    {
      expiresIn:"3d"
    })
    res.status(201).json({others, accessToken});
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}
