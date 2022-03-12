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
  role: RoleEnum
  area?: string
}
