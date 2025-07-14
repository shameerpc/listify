import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  status: { type: Boolean, required: false },
  delete_status: { type:Boolean,default:false  },
  createdAt:{type:Date,default:Date.now()}
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task; // ✅ Correct way to export