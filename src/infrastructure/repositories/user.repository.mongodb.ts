import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces';
import { Model, ObjectId, Types } from 'mongoose';
import { UserSchemaDocument } from 'src/application/dto/user/user.schema.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { stringToObjectId } from '../utils/string_to_Objectid';
@Injectable()
export class UserRepositoryMongoDB implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserSchemaDocument>
  ) { }
  async findById(id: string): Promise<UserSchemaDocument | null> {
    // Implementation for fetching a User by ID from MongoDB
    const o_id = stringToObjectId(id);
    let retuser = await this.userModel.findOne({ _id: o_id }).exec()
    return retuser;
  }
  async findByEmail(email: string): Promise<UserSchemaDocument | null> {
    // Implementation for fetching a User by email from MongoDB
    let retUser = await this.userModel.findOne({
      email: email
    }).exec();


    if (!retUser) {
      return null;
    }
    return retUser;

  }
  async findAll(): Promise<User[]> {
    // Implementation for fetching all Users from MongoDB
    return [];
  }
  async getFavoriteVKMs(userId: string): Promise<User | null> {
    // Implementation for fetching user's favorite VKMs
    return null;
  }
  async getEnrolledVKMs(userId: string): Promise<User | null> {
    // Implementation for fetching user's enrolled VKMs
    return null;
  }
  async getAiReccomendedVKMs(userId: string): Promise<any | null> {
    // Implementation for fetching AI recommended VKMs for the user
    return null;
  }
  async setRecommendations(userId: string, recommendations: number[]): Promise<void> {
    const updated = await this.userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { $set: { ai_reccomended_vkms: recommendations } },
      { new: true },
    );


    if (updated === null) {
      throw new NotFoundException('User not found');
    }
  }
}