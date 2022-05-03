/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserRegister {
  email: string;
  password: string;
}

export class AuthenticatedUser {
  jwt: string;
}

export class AddNewToDo {
  title: string;
  description: string;
}

export class AuthResponse {
  __typename?: 'AuthResponse';
  jwt: string;
}

export abstract class IMutation {
  __typename?: 'IMutation';

  abstract register(data: UserRegister): AuthResponse | Promise<AuthResponse>;

  abstract addNewToDo(
    data?: Nullable<AddNewToDo>,
    user?: Nullable<AuthenticatedUser>
  ): ToDo | Promise<ToDo>;
}

export class ToDo {
  __typename?: 'ToDo';
  id: string;
  title: string;
  description: string;
}

export abstract class IQuery {
  __typename?: 'IQuery';

  abstract getAllTodosFromUser(
    data: AuthenticatedUser
  ): Nullable<ToDo>[] | Promise<Nullable<ToDo>[]>;
}

type Nullable<T> = T | null;
