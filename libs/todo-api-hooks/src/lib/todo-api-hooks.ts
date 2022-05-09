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

type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

type AuthenticatedUser = {
  jwt: Scalars['String'];
};

type DeleteAndUpdateResponse = {
  __typename?: 'DeleteAndUpdateResponse';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

type DeleteTodo = {
  id: Scalars['String'];
};

type Mutation = {
  __typename?: 'Mutation';
  addNewToDo?: Maybe<ToDo>;
  deleteToDo: DeleteAndUpdateResponse;
  login: AuthResponse;
  register: AuthResponse;
  updateToDo: DeleteAndUpdateResponse;
  updateToDoState: DeleteAndUpdateResponse;
};

type MutationAddNewToDoArgs = {
  data: NewToDo;
  user: AuthenticatedUser;
};

type MutationDeleteToDoArgs = {
  data: DeleteTodo;
  user: AuthenticatedUser;
};

type MutationLoginArgs = {
  data: UserRegister;
};

type MutationRegisterArgs = {
  data: UserRegister;
};

type MutationUpdateToDoArgs = {
  data: UpdateTodo;
  user: AuthenticatedUser;
};

type MutationUpdateToDoStateArgs = {
  data: UpdateTodoState;
  user: AuthenticatedUser;
};

type NewToDo = {
  description: Scalars['String'];
  title: Scalars['String'];
};

type Query = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<ToDo>;
};

type QueryGetAllTodosFromUserArgs = {
  data: AuthenticatedUser;
};

type ToDo = {
  __typename?: 'ToDo';
  description: Scalars['String'];
  id: Scalars['String'];
  state: ToDoState;
  title: Scalars['String'];
};

enum ToDoState {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

type UpdateTodo = {
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

type UpdateTodoState = {
  id: Scalars['String'];
  state: ToDoState;
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
  register: {
    __typename?: 'AuthResponse';
    jwt?: string | null;
    message?: string | null;
  };
};

type LoginMutationVariables = Exact<{
  data: UserRegister;
}>;

type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    jwt?: string | null;
    message?: string | null;
  };
};

type CreateNewTodoMutationVariables = Exact<{
  data: NewToDo;
  user: AuthenticatedUser;
}>;

type CreateNewTodoMutation = {
  __typename?: 'Mutation';
  addNewToDo?: {
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
    state: ToDoState;
  } | null;
};

type UpdateToDoMutationVariables = Exact<{
  data: UpdateTodo;
  user: AuthenticatedUser;
}>;

type UpdateToDoMutation = {
  __typename?: 'Mutation';
  updateToDo: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
  };
};

type UpdateToDoStateMutationVariables = Exact<{
  data: UpdateTodoState;
  user: AuthenticatedUser;
}>;

type UpdateToDoStateMutation = {
  __typename?: 'Mutation';
  updateToDoState: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
  };
};

type DeleteToDoMutationVariables = Exact<{
  data: DeleteTodo;
  user: AuthenticatedUser;
}>;

type DeleteToDoMutation = {
  __typename?: 'Mutation';
  deleteToDo: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
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
    state: ToDoState;
  }>;
};

const RegisterDocument = `
    mutation Register($data: UserRegister!) {
  register(data: $data) {
    jwt
    message
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
const LoginDocument = `
    mutation Login($data: UserRegister!) {
  login(data: $data) {
    jwt
    message
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        client,
        LoginDocument,
        variables,
        headers
      )(),
    options
  );
const CreateNewTodoDocument = `
    mutation createNewTodo($data: NewToDo!, $user: AuthenticatedUser!) {
  addNewToDo(data: $data, user: $user) {
    id
    title
    description
    state
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
const UpdateToDoDocument = `
    mutation updateToDo($data: UpdateTodo!, $user: AuthenticatedUser!) {
  updateToDo(data: $data, user: $user) {
    message
    error
  }
}
    `;
export const useUpdateToDoMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateToDoMutation,
    TError,
    UpdateToDoMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateToDoMutation,
    TError,
    UpdateToDoMutationVariables,
    TContext
  >(
    ['updateToDo'],
    (variables?: UpdateToDoMutationVariables) =>
      fetcher<UpdateToDoMutation, UpdateToDoMutationVariables>(
        client,
        UpdateToDoDocument,
        variables,
        headers
      )(),
    options
  );
const UpdateToDoStateDocument = `
    mutation updateToDoState($data: UpdateTodoState!, $user: AuthenticatedUser!) {
  updateToDoState(data: $data, user: $user) {
    message
    error
  }
}
    `;
export const useUpdateToDoStateMutation = <
  TError = unknown,
  TContext = unknown
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateToDoStateMutation,
    TError,
    UpdateToDoStateMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateToDoStateMutation,
    TError,
    UpdateToDoStateMutationVariables,
    TContext
  >(
    ['updateToDoState'],
    (variables?: UpdateToDoStateMutationVariables) =>
      fetcher<UpdateToDoStateMutation, UpdateToDoStateMutationVariables>(
        client,
        UpdateToDoStateDocument,
        variables,
        headers
      )(),
    options
  );
const DeleteToDoDocument = `
    mutation deleteToDo($data: DeleteTodo!, $user: AuthenticatedUser!) {
  deleteToDo(data: $data, user: $user) {
    message
    error
  }
}
    `;
export const useDeleteToDoMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteToDoMutation,
    TError,
    DeleteToDoMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteToDoMutation,
    TError,
    DeleteToDoMutationVariables,
    TContext
  >(
    ['deleteToDo'],
    (variables?: DeleteToDoMutationVariables) =>
      fetcher<DeleteToDoMutation, DeleteToDoMutationVariables>(
        client,
        DeleteToDoDocument,
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
    state
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
