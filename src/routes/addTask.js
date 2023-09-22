import Tasks from "../models/taskModel.js";

export default async (req, res) =>
{
  try
  {
    const task = new Tasks({
        email: req.user.email,
        task: req.body.task,
        completed : req.body.completed || false
      });
    const saved = await task.save();
    res.status(200).json({saved});
  }
  catch(error)
  {
    res.status(400).json({ error: error.message });
  }

}