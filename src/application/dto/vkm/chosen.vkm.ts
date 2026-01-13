export class ChosenModuleDto {
  constructor(vkmId: number, Priority?: number, Enrolled?: boolean) {
    this.priority = Priority ?? 0;
    this.enrolled = Enrolled ?? false;
    this.id = vkmId;
  }
  priority: number;
  id: number;
  enrolled: boolean;
}