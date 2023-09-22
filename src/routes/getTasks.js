import Tasks from "../models/taskModel.js";

export default async (req, res) =>
{
  try
  {
    const tasks = await Tasks.find({email: req.user.email});
    res.status(200).json(tasks);
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}