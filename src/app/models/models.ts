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
  bancoPreguntaId?: number = 0
  tema?: string = ''
  fechaCreacion?: string = ''
  experimento?: string
  publicado?: boolean
  fechaLimite?: string
  isOn?: boolean
}

export class Pregunta {
  preguntaId?: number 
  descripcion?: string
  puntuacion?: number
  respuestas?: Respuesta[]
  bancoPreguntaId?: number
  tp?: string
  isOn?: boolean
}

export class Respuesta {
  respuestaId?: number;
  descripcion?: string;
  esCorrecta: boolean = false

  constructor(descripcion: string) {
    this.descripcion = descripcion
  }
}