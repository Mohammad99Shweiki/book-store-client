import { environment } from "src/environments/environment";
import { SideNavLink } from "./models/sidenav-link";

export const SERVER_API_URL = environment.serverUrL;

export const END_POINTS = {
  AUTH: {
    LOG_IN: "/auth/login",
    SIGN_UP: "/auth/register"
  },
  BOOKS: "/books",
  BOOKS_SIMILAR: "/books/similar",
  BOOKS_SALES: "/books/onSale",
  BOOKS_SEARCH: "/books/search",
  USERS: {
    RECOMMEND: "/users/recommend",
    index: "/users",
  },
  STORE: "/store",
  CART: "/store/cart"
}

export const ROLES = {
  ADMIN: 'ADMIN',
}

export const SIDE_NAV_OPTIONS: SideNavLink[] = [
  {
    title: 'Users',
    value: 'users',
    icon: 'group'
  },
  {
    title: 'Books',
    value: 'books',
    icon: 'menu_book'
  },
  {
    title: 'Orders Tracking',
    value: 'orders',
    icon: 'receipt_long'
  },
  {
    title: 'Reports and Analytics',
    value: 'reports',
    icon: 'signal_cellular_alt'
  }
]

export const TABLE_ITEMS_PER_PAGE = 10;
export type SidenavValues = 'orders' | 'reports' | 'books' | 'users'

export const TEMP_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmRhbGF6ZWV6IiwiaWF0IjoxNzE1MzQ1MDUwLCJleHAiOjE3MTU0MzE0NTB9.7d73IcXK-kpIseaXwW8jztDWDNyyxq90rfTpfFzlFtqeFVwX9o_g9Y5CVHuGfqPRE68isgGT3tuBh9KOmeaaUg';