import api from '@/lib/axios'
import type { User } from '@/types/user'

export const userService = {
  async listByRatingSignal(ratingSignalId: number): Promise<User[]> {
    const response = await api.post('/users/listByRatingSignal', { ratingSignalId })
    return response.data
  },

  async add(user: Omit<User, 'id'>): Promise<User> {
    const userData = {
      ...user,
      created: new Date().toISOString(),
      enabled: true
    }
    const response = await api.post('/users/add', userData)
    return response.data
  },

  async update(user: User): Promise<User> {
    const userData = {
      ...user,
      created: user.created || new Date().toISOString()
    }
    const response = await api.post('/users/update', userData)
    return response.data
  }
} 