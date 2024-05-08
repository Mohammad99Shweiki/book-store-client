import { environment } from "src/environments/environment";

export const SERVER_API_URL = environment.serverUrL;

export const END_POINTS = {
  AUTH: {
    LOG_IN: "/auth/signin",
    SIGN_UP: "/auth/signup"
  },
  BOOKS: "/books"
}