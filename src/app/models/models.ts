
export enum Role {
  Admin,
  Profesor,
  Estudiante
}

export class User {
  userId: number = 0;
  username: string = '';
  password: string = '';
  role?: Role;
  token?: string;
}
