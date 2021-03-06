export class User {
  id? :number
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
  matricula?: string;
  grado?: string;
  seccion?: string;
}

export class BancoPreg {
  bancoPreguntaId?: number
  tema?: string = ''
  fechaCreacion?: string = ''
  experimento?: string
  publicado?: boolean
  fechaLimite?: string
  isOn?: boolean
  userId: number = 1
  username?: string
  tituloPublicado?: string
  descripcion?: string
  instruccion?: string
  grado?: string
  califTotalPublicado: number = 10
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


export class Concepto {
  tipoPreguntaId?: number;
  descripcion?: string;
  concepto: string = 'N/A'
}

export class Respuesta {
  respuestaId?: number;
  descripcion?: string;
  esCorrecta: boolean = false
  preguntaId?: number
  constructor(descripcion: string) {
    this.descripcion = descripcion
  }
}

export class PruebaExperimento {
  pruebaExperimentoId?: number
  titulo?: string
  userId?: number
  user?: User
  bancoPreguntaId?: number
  fechaTomado?: Date
  calificacionObtenida?: number
  calificacionTotal?: number
  isCerrada?: boolean
  periodo?: string
  calificacionObtenidaReal: number = 0
}

export class PruebaRespuesta {
  pruebaRespuestaId?: number
  PEId?: number
  pregunta?: Pregunta
  respuesta?: Respuesta
  preguntaId?: number
  respuestaId?: number
}

export class History {
  historyId?: number
  username?: string
  what?: string
  fecha?: Date
}

export class Sesion {
  sesionId?: number
  grado?: string
  sesionNombre?: string
  isOn?: boolean
}
