import { IBaseRepository } from "../common";
import { VKM } from "../../entities/index";

export interface IvkmRepository extends IBaseRepository<VKM> {
  findbyName(name: string): Promise<VKM | null>;
  findbyTag(tag: string): Promise<VKM[]>;
  findbyLevel(level: string): Promise<VKM[]>;
  findbyLocation(location: string): Promise<VKM[]>;
  findbystudyCredits(studyCredits: number): Promise<VKM[]>;
  findallsortedbytheme(): Promise<VKM[]>;
}