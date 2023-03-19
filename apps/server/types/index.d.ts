declare namespace Express {
  export interface Request {
    body: {
      friendId: string;
    };
    user: {
      email: string;
      _id: string;
      name: string;
    };
    params: {
      slug: string;
    };
    query: {
      search: string;
      limit: string;
    };
  }
}
