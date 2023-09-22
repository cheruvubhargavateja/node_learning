import Users from "../models/userModel.js";

export default async (req, res) =>
{
  if(!req.params.id)
  {
    res.status(400).json({message:"User not found!"});
  }

  try
  {
    await Users.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Successfully dleted your profile!"});
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}