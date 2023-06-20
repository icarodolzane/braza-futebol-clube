import { IUsers } from '../../Interfaces/Users/IUsers';
export const userMock: IUsers = {
  id:1,
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
  username: 'Admin'
}

export const bodyWithoutEmail = { password: 'password' }

export const bodyWithoutPassword = { 
  email: 'example@example.com'
}

export const bodyInvalidEmail = {
  email: '@example.com',
  password: 'password'
}
export const bodyInvalidPassword = {
  email: 'example@example.com',
  password: 'a'
}
export const validBody = {
  email: 'admin@admin.com',
  password: 'secret_admin' 
}

export const validBodyWrongPassword = { 
  email: 'admin@user.com',
  password: 'wrong_password'
}

export const validUser: IUsers = {
  id: 1,
  email: 'admin@admin.com',
  password: 'secret_admin',
  role: 'admin',
  username: 'Admin',
}