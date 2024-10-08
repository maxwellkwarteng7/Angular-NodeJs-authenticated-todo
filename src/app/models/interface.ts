export interface userLogins {
  username: string;
  password: string;
}




export enum Icon {
  success = 'success', 
  error = 'error', 
  info = 'info', 
  warning = 'warning'
}

export interface registerUser {
  username: string, 
  password : string 
}

export interface userToken {
  token : string ,
}

export interface userTodo {
  id: number, 
  todo: string, 
  userId: number, 
  createdAt: Date, 
  updatedAt : Date ,
}