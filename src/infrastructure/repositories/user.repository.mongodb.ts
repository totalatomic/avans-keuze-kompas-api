import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces';
import { Model, ObjectId, Types } from 'mongoose';
import { UserSchemaDocument } from 'src/application/dto/user/user.schema.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepositoryMongoDB implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserSchemaDocument>
  ) { }
  async findById(id: number): Promise<User | null> {
    // Implementation for fetching a User by ID from MongoDB
    return null;
  }
  async create(item: User): Promise<User> {
    // Implementation for creating a new User in MongoDB
    return item;
  }
  async update(id: string, item: User): Promise<User | null> {
    // Implementation for updating a User in MongoDB
    return null;
  }
  async delete(id: string): Promise<boolean> {
    // Implementation for deleting a User from MongoDB
    return true;
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
  async login(): Promise<User | null> {
    // Implementation for user login
    return null;
  }

  async logout(): Promise<void> {
    // Implementation for user logout
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
  async addFavoriteVKM(userId: string, vkmId: number): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { favoriteVKMs: vkmId } }
    ).exec();
  }
}