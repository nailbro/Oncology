// src/models/thesis.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IThesis extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  doc: string;
  createdAt: Date;
}

const thesisSchema: Schema<IThesis> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    doc: { type: String, required: true }, // имя файла
  },
  { timestamps: true }
);

const Thesis: Model<IThesis> = mongoose.model<IThesis>("Thesis", thesisSchema);
export default Thesis;