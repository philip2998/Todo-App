export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  data: {
    user: {
      role: string;
      id: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };
  };
}

export interface Todo {
  _id: string;
  userId: string;
  title: string;
  description: string;
}
