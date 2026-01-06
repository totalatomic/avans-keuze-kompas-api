import { Schema } from 'mongoose';

export const MsgSchema = new Schema({
  id: { type: String, required: true, unique: true },
  senderName: { type: String, required: true },
  receiverId: { type: String, required: true },
  title: { type: String, required: true },
  messagetext: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
