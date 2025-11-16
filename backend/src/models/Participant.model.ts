import mongoose, { Schema, Document } from 'mongoose';

export interface IParticipant extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  check?: string;
}

const ParticipantSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  phone: { type: String, required: true },
  check: { type: String },
}, { timestamps: true });

export default mongoose.model<IParticipant>('Participant', ParticipantSchema);