import { environment } from "src/environments/environment";

export const SERVER_API_URL = environment.serverUrL;

export const END_POINTS = {
  AUTH: {
    LOG_IN: "/auth/login",
    SIGN_UP: "/auth/signup"
  },
  BOOKS: "/books",
  USERS: {
    RECOMMEND: "/users/recommend",
    index: "/users"
  }
}

export const TEMP_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmRhbGF6ZWV6IiwiaWF0IjoxNzE1MzQ1MDUwLCJleHAiOjE3MTU0MzE0NTB9.7d73IcXK-kpIseaXwW8jztDWDNyyxq90rfTpfFzlFtqeFVwX9o_g9Y5CVHuGfqPRE68isgGT3tuBh9KOmeaaUg';