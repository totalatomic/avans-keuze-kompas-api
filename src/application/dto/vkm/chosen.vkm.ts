export class ChosenModuleDto {
  constructor(vkmId: Number, Priority?: number, Enrolled?: boolean) {
    this.priority = Priority ?? 0;
    this.enrolled = Enrolled ?? false;
    this.id = vkmId ?? 0;
  }
  priority: number;
  id: Number;
  enrolled: boolean;
}