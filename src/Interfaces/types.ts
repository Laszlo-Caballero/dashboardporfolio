export interface Responsive<T> {
  message: string;
  body: T;
  status: number;
}

export interface UserResponsive {
  token: string;
  _id: string;
  username: string;
  password: string;
  role: string;
  __v: number;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface ProyectResponsive {
  _id: string;
  proyectId: string;
  title: string;
  description: string;
  urlImage: string;
  tecnologies: Tecnology[];
  __v: number;
}

export interface Tecnology {
  urlImage: string;
  name: string;
  _id: string;
}

export interface ExperienceResponsive {
  _id: string;
  experienceId: string;
  title: string;
  description: string;
  company: string;
  urlImage: string;
  time: string;
  __v: number;
}

export interface ImagesResponsive {
  _id: string;
  name: string;
  url: string;
  __v: number;
  type?: string;
}
