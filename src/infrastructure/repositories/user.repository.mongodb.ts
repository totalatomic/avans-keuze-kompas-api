import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces';
import { Model, ObjectId } from 'mongoose';
import { UserSchemaDocument } from 'src/application/dto/user/user.schema.dto';
import { Injectable } from '@nestjs/common';

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
  async getAiReccomendedVKMs(userId: string): Promise<User | null> {
    // Implementation for fetching AI recommended VKMs for the user
    return null;
  }

}