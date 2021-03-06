import mongoose, { Schema, Document, ObjectId } from 'mongoose';

import { ToDoSchema } from './todo-model';

export interface UserModel extends Document {
  email: string;
  password: string;
}

export interface InputUser {
  id?: ObjectId;
  email: UserModel['email'];
  password: UserModel['password'];
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: ToDoSchema, ref: 'Todo' }],
});

// Export the model and return your User interface
export default mongoose.model<UserModel>('User', UserSchema);
