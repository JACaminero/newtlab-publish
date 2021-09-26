export class User {
  userId: number = 0;
  username: string = '';
  password: string = '';
  role?: string;
  token?: string;
  name: string = '';
  lastName1: string = '';
  lastName2: string = '';
  phone: string = '';
  birth?: Date;
  cedula?: string;
  isOn?: boolean;
}

export class BancoPreg {
  BancoPreguntaId?: number = 0
  Tema?: string = ''
  FechaCreacion?: string = ''
  Experimento?: any
}

export class Pregunta {
  description?: string
  answer1?: string
  answer2?: string
  answer3?: string
  answer4?: string
  Puntuacion?: number
}