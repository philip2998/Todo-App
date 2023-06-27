export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
}
