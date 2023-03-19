export interface User {
  _id: string;
  name: string;
  slug: string;
  email: string;
  password: string;
  gender?: string;
  bio?: string;
  friends?: string[];
}
