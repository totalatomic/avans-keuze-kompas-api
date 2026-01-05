export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}