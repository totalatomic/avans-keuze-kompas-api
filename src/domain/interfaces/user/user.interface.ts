import { IBaseRepository } from '../common'
import { User } from '../../entities'

export interface IUserRepository extends IBaseRepository<User> {
  login(): Promise<User | null>
  logout(): void
  getFavoriteVKMs(userId: string): Promise<User | null>
  getEnrolledVKMs(userId: string): Promise<User | null>
  getAiReccomendedVKMs(userId: string): Promise<User | null>

}