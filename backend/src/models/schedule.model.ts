import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISchedule extends Document {
  title: string;
  date: Date;
}

const scheduleSchema: Schema<ISchedule> = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Schedule: Model<ISchedule> = mongoose.model<ISchedule>("Schedule", scheduleSchema);
export default Schedule;
