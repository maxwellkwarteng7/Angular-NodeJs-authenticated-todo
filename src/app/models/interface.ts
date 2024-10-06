export interface userLogins {
  username: string;
  password: string;
}


export interface todo {
  task: string, 
  id : number 
}


export enum Icon {
  success = 'success', 
  error = 'error', 
  info = 'info', 
  warning = 'warning'
}