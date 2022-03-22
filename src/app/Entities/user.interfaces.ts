export enum RoleEnum {
  admin = 'admin',
  employee = 'employee',
  technician = 'technician'
}

export interface User extends UserIdentity {
  password: string
  // resetToken?: ResetToken
  active: boolean
  archived: boolean
}

export interface UserIdentity {
  forename: string
  surname: string
  email: string
  role: string
  area?: string
  id: string
}

export interface CreateUser {
  forename: string
  surname: string
  email: string
  role: string
  password: string,
  area: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserIdentityCountTickets {
  forename: string
  surname: string
  email: string
  role: string
  area?: string
  id: string,
  count?: number
}
