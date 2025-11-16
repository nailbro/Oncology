import mongoose, { Schema } from "mongoose";
const scheduleSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });
const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
