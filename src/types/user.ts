export interface User {
  id?: number
  name?: string
  created?: string
  email?: string
  password?: string
  enabled?: boolean
  ratingSignalId?: number
}

export interface UserListResponse {
  users: User[]
}

export interface UserResponse {
  user: User
} 