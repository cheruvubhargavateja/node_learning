import Users from "../models/userModel.js";
import CryptoJS from "crypto-js";
import { configs } from "../config.js";

export default async (req, res) =>
{

  const { username, email, password } = req.body;

  const encryptedPass = CryptoJS.AES
    .encrypt(password, configs.token_secret).toString();

  if(!req.params.id)
  {
    res.status(400).json({message:"User not found!"});
  }

  try
  {
      await Users.findByIdAndUpdate(req.params.id,
      {
        $set:{
          username,
          email,
          password: encryptedPass
        }
      },
      {
          new: true
      }
    )
    res.status(201).json({message:"Successfully updated your profile!"});
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}
