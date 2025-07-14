import Task from "../model/taskModel.js";

// Create a new Task
export const createTask = async (req, res) => {
  try {
    console.log(req.user)
    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description,
      status
    });

    await task.save();
    res.status(201).json({ success:true, message: "Task created", result:task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all blogs
export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({delete_status:false})
    res.status(200).json({success:true,message:"Task retrieved successfully",response:task});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single blog
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task || task.delete_status) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({success:true,message:"Task retrieved successfully",response:task});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.delete_status) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update only the fields provided in req.body
    if (req.body.title !== undefined) task.title = req.body.title.trim();
    if (req.body.description !== undefined) task.description = req.body.description.trim();
        if (req.body.status !== undefined) task.status = req.body.status.trim();

    await task.save();

    res.status(200).json({ message: "Task updated", task:task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Soft delete
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.delete_status) return res.status(404).json({ error: "Task not found" });

    task.delete_status = true;
    await task.save();

    res.status(200).json({ message: "Task deleted (soft)",Task:task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
