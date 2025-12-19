import { IvkmRepository } from "../../domain/interfaces/vkm/vkm.interface";
import { Injectable } from "@nestjs/common";
import { VkmDocument, VkmSchema } from "./dto";
import { VkmRepositoryMongoDB } from "../../infrastructure/repositories/vkm";
import { VKM } from "src/domain/entities";

@Injectable()
export class VkmService {
  constructor(private readonly vkmRepository: VkmRepositoryMongoDB) { }

  async findAll(): Promise<VKM[]> {
    return this.vkmRepository.findAll();
  }
  async findallsortedbytheme(): Promise<VKM[]> {
    return this.vkmRepository.findbythemeTag('homepage');
  }
}
