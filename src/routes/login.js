import Users from "../models/userModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"
import { configs } from "../config.js";
export default async (req, res) =>
{
  if(!req.body.email || !req.body.password)
  {
    res.status(400).json({ error: 'fields required' });
  }

  try
  {
      const loggedIn = await Users.findOne({email: req.body.email});
      var decryptedPass = CryptoJS
        .AES.decrypt(loggedIn.password, configs.token_secret);

      const passwords = decryptedPass.toString(CryptoJS.enc.Utf8);
      if(passwords === req.body.password)
      {
        const accessToken = jwt.sign({
          id: loggedIn._id,
          email: loggedIn.email
        },
        configs.token_secret,
        {
          expiresIn:"3d"
        })

        const {password, __v, ...others} = loggedIn._doc;
        res.status(200).json({others, accessToken});
      }
      else
      {
        res.status(401).json({ error: 'Invalid credentials' });
      }
      
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}