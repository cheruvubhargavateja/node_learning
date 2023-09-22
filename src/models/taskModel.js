import {Schema, model} from "mongoose";

const taskSchema = new Schema({
    email : {type:String, required: true},
    task : {type:String, required: true},
    completed : {type:Boolean, default: false}
})
const Tasks = model('tasks', taskSchema);
export default Tasks