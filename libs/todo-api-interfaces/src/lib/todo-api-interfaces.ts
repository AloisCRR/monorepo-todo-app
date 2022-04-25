/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class ToDo {
  __typename?: 'ToDo';
  id: string;
  title: string;
  description: string;
}

export abstract class IQuery {
  __typename?: 'IQuery';

  abstract todos():
    | Nullable<Nullable<ToDo>[]>
    | Promise<Nullable<Nullable<ToDo>[]>>;
}

type Nullable<T> = T | null;
