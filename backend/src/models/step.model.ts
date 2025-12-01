import mongoose, { Document } from "mongoose";

export interface IStep extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  check?: string;
  confirmed?: boolean;  
  createdAt?: Date;
  updatedAt?: Date;
}

const StepSchema = new mongoose.Schema<IStep>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    check: { type: String },
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Step = mongoose.model<IStep>("Step", StepSchema);
