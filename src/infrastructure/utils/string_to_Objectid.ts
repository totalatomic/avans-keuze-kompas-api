import { ObjectId } from "mongoose";

export function stringToObjectId(input: string): ObjectId {
  const { ObjectId } = require('mongodb');
  return new ObjectId(input);
}