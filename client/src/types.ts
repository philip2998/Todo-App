export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface Todo {
  _id: string;
  userId: string;
  title: string;
  description: string;
}
