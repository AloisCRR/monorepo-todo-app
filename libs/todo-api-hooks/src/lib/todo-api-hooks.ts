import type { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions
} from 'react-query';
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type AddNewToDo = {
  description: Scalars['String'];
  title: Scalars['String'];
};

type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt: Scalars['String'];
};

type AuthenticatedUser = {
  jwt: Scalars['String'];
};

type Mutation = {
  __typename?: 'Mutation';
  addNewToDo: ToDo;
  register: AuthResponse;
};

type MutationAddNewToDoArgs = {
  data?: InputMaybe<AddNewToDo>;
  user?: InputMaybe<AuthenticatedUser>;
};

type MutationRegisterArgs = {
  data: UserRegister;
};

type Query = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<Maybe<ToDo>>;
};

type QueryGetAllTodosFromUserArgs = {
  data: AuthenticatedUser;
};

type ToDo = {
  __typename?: 'ToDo';
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

type UserRegister = {
  email: Scalars['String'];
  password: Scalars['String'];
};

type RegisterMutationVariables = Exact<{
  data: UserRegister;
}>;

type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'AuthResponse'; jwt: string };
};

type CreateNewTodoMutationVariables = Exact<{
  data: AddNewToDo;
  user: AuthenticatedUser;
}>;

type CreateNewTodoMutation = {
  __typename?: 'Mutation';
  addNewToDo: {
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
  };
};

type GetAllToDoQueryVariables = Exact<{
  data: AuthenticatedUser;
}>;

type GetAllToDoQuery = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<{
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
  } | null>;
};

const RegisterDocument = `
    mutation Register($data: UserRegister!) {
  register(data: $data) {
    jwt
  }
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ['Register'],
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        client,
        RegisterDocument,
        variables,
        headers
      )(),
    options
  );
const CreateNewTodoDocument = `
    mutation createNewTodo($data: AddNewToDo!, $user: AuthenticatedUser!) {
  addNewToDo(data: $data, user: $user) {
    id
    title
    description
  }
}
    `;
export const useCreateNewTodoMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateNewTodoMutation,
    TError,
    CreateNewTodoMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateNewTodoMutation,
    TError,
    CreateNewTodoMutationVariables,
    TContext
  >(
    ['createNewTodo'],
    (variables?: CreateNewTodoMutationVariables) =>
      fetcher<CreateNewTodoMutation, CreateNewTodoMutationVariables>(
        client,
        CreateNewTodoDocument,
        variables,
        headers
      )(),
    options
  );
const GetAllToDoDocument = `
    query GetAllToDo($data: AuthenticatedUser!) {
  getAllTodosFromUser(data: $data) {
    id
    title
    description
  }
}
    `;
export const useGetAllToDoQuery = <TData = GetAllToDoQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetAllToDoQueryVariables,
  options?: UseQueryOptions<GetAllToDoQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetAllToDoQuery, TError, TData>(
    ['GetAllToDo', variables],
    fetcher<GetAllToDoQuery, GetAllToDoQueryVariables>(
      client,
      GetAllToDoDocument,
      variables,
      headers
    ),
    options
  );
