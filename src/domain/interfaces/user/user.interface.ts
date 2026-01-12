import { IBaseRepository } from '../common'
import { User } from '../../entities'

export interface IUserRepository {
  getEnrolledVKMs(userId: string): Promise<User | null>
}