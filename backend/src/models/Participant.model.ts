import mongoose, { Schema, Document } from 'mongoose';

export interface IParticipant extends Document {
    _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  check?: string;
  confirmed?: boolean;
}

const ParticipantSchema: Schema = new Schema({
    _id: { type: String, required: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  phone: { type: String, required: true },
  check: { type: String },
    confirmed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IParticipant>('Participant', ParticipantSchema);