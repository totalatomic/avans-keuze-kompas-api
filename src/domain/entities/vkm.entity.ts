import { BaseEntity } from '../common/index';
export class VKM extends BaseEntity {
  shortdescription: string;
  description: string;
  content: string;
  image: string;
  studyCredits: number;
  location: Array<string>;
  contactId: number;
  level: string;
  learningoutcomes: string;
  module_tags: Array<string>;
  availablespots: number;
  startdate: Date;
  theme_tags: Array<string>;
}