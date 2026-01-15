import { IvkmRepository } from "../../domain/interfaces/vkm/vkm.interface";
import { InjectModel } from "@nestjs/mongoose";
import { VkmSchema, VkmDocument } from '../../application/dto/vkm';
import { Model } from "mongoose";
import { VKM } from "../../domain/entities";
export class VkmRepositoryMongoDB_en implements IvkmRepository {
  constructor(
    @InjectModel(VKM.name + '_ens')
    private readonly vkmModel: Model<VkmDocument>
  ) { }
  async findAll(): Promise<VKM[]> {
    // Implementation for fetching all VKM records from MongoDB'
    let returnedVkms = await this.vkmModel.find().exec();
    return returnedVkms;

  }
  async findById(id: Number): Promise<VKM | null> {
    // Implementation for fetching a VKM record by ID from MongoDB
    let returnedVkm = await this.vkmModel.findOne({ id: Number(id) }).exec();
    return returnedVkm;
  }
  async create(item: VKM): Promise<VKM> {
    // Implementation for creating a new VKM record in MongoDB
    return item;
  }
  async update(id: string, item: VKM): Promise<VKM | null> {
    // Implementation for updating a VKM record in MongoDB
    return null;
  }
  async delete(id: string): Promise<boolean> {
    // Implementation for deleting a VKM record from MongoDB
    return true;
  }
  async findbyName(name: string): Promise<VKM | null> {
    // Implementation for fetching a VKM record by name from MongoDB
    return null;
  }
  async findbyTag(tag: string): Promise<VKM[]> {
    // Implementation for fetching VKM records by tag from MongoDB
    return [];
  }
  async findbyLevel(level: string): Promise<VKM[]> {
    // Implementation for fetching VKM records by level from MongoDB
    return [];
  }
  async findbyLocation(location: string): Promise<VKM[]> {
    // Implementation for fetching VKM records by location from MongoDB
    return [];
  }
  async findbystudyCredits(studyCredits: number): Promise<VKM[]> {
    // Implementation for fetching VKM records by study credits from MongoDB
    return [];
  }
  async findallsortedbytheme(): Promise<VKM[]> {
    // Implementation for fetching VKM records by theme tag from MongoDB
    return await this.vkmModel.aggregate([
      {
        $addFields: {
          theme_tags_array: {
            $map: {
              input: {
                $split: [
                  {
                    $trim: {
                      input: '$theme_tags',
                      chars: "[]'"
                    }
                  },
                  ','
                ]
              },
              as: 'tag',
              in: { $trim: { input: '$$tag' } }
            }
          }
        }
      },
      { $unwind: '$theme_tags_array' },
      {
        $group: {
          _id: '$theme_tags_array',
          modules: { $push: '$$ROOT' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          theme: '$_id',
          count: 1,
          modules: 1,
          _id: 0
        }
      }
    ]);
  }
}