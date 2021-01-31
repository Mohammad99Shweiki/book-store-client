import {AuthResponse} from './authResponse';

export interface LoginResponse extends AuthResponse{
  data?: {
    jwt: string;
    userId: string;
  };
}
