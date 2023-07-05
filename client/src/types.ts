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

export interface UserData {
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface Todo {
  _id: string;
  userId: string;
  title: string;
  description: string;
}
