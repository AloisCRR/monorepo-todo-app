/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface ToDo {
  __typename?: 'ToDo';
  id: string;
  title: string;
  description: string;
}

export interface IQuery {
  __typename?: 'IQuery';
  todos(): Nullable<Nullable<ToDo>[]> | Promise<Nullable<Nullable<ToDo>[]>>;
}

type Nullable<T> = T | null;
