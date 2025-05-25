export interface Manual {
  id?: number;
  planta: string;
  luz: string;
  riego: string;
  humedad: string;
  temperatura: string;
  abono: string;
  poda: string;
  trasplante: string;
  enfermedades: string;
  otros?: string;
  imagen: string;
  user: number;
  createdAt?: Date;
  updatedAt?: Date;
}
