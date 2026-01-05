export abstract class BaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}