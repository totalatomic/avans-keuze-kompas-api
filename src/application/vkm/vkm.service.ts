import { IvkmRepository } from "../../domain/interfaces/vkm/vkm.interface";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { VkmDocument, VkmSchema } from "./dto";
import { VkmRepositoryMongoDB } from "../../infrastructure/repositories/vkm";
import { VKM } from "src/domain/entities";

@Injectable()
export class VkmService {
  constructor(
    @Inject('IvkmRepository')
    private readonly vkmRepository: VkmRepositoryMongoDB) { }

  async findAll(): Promise<VKM[]> {
    return this.vkmRepository.findAll();
  }
  async findById(id: Number): Promise<VKM> {
    let vkm = await this.vkmRepository.findById(id);
    if (!vkm) {
      //throw soft error if not found
      throw new NotFoundException(`VKM not found`);
    }
    return vkm;
  }
  async findallsortedbytheme(): Promise<VKM[]> {
    return this.vkmRepository.findallsortedbytheme();
  }
}
