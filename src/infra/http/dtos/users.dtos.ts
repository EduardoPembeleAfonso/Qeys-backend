export type CreateUserDto = {
    name: string;
    email: string;
    password: string;
    type: string;
  }
  
  export type CredentialsLoginDto = {
    email: string;
    password: string;
  }