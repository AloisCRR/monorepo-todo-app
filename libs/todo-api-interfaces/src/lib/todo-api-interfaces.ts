import type { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type AuthenticatedUser = {
  jwt: Scalars['String'];
};

export type DeleteAndUpdateResponse = {
  __typename?: 'DeleteAndUpdateResponse';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type DeleteTodo = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewToDo?: Maybe<ToDo>;
  deleteToDo: DeleteAndUpdateResponse;
  login: AuthResponse;
  register: AuthResponse;
  updateToDo: DeleteAndUpdateResponse;
  updateToDoState: DeleteAndUpdateResponse;
};

export type MutationAddNewToDoArgs = {
  data: NewToDo;
  user: AuthenticatedUser;
};

export type MutationDeleteToDoArgs = {
  data: DeleteTodo;
  user: AuthenticatedUser;
};

export type MutationLoginArgs = {
  data: UserRegister;
};

export type MutationRegisterArgs = {
  data: UserRegister;
};

export type MutationUpdateToDoArgs = {
  data: UpdateTodo;
  user: AuthenticatedUser;
};

export type MutationUpdateToDoStateArgs = {
  data: UpdateTodoState;
  user: AuthenticatedUser;
};

export type NewToDo = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<ToDo>;
};

export type QueryGetAllTodosFromUserArgs = {
  data: AuthenticatedUser;
};

export type ToDo = {
  __typename?: 'ToDo';
  description: Scalars['String'];
  id: Scalars['String'];
  state: ToDoState;
  title: Scalars['String'];
};

export enum ToDoState {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type UpdateTodo = {
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateTodoState = {
  id: Scalars['String'];
  state: ToDoState;
};

export type UserRegister = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  data: UserRegister;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthResponse';
    jwt?: string | null;
    message?: string | null;
  };
};

export type LoginMutationVariables = Exact<{
  data: UserRegister;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    jwt?: string | null;
    message?: string | null;
  };
};

export type CreateNewTodoMutationVariables = Exact<{
  data: NewToDo;
  user: AuthenticatedUser;
}>;

export type CreateNewTodoMutation = {
  __typename?: 'Mutation';
  addNewToDo?: {
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
    state: ToDoState;
  } | null;
};

export type UpdateToDoMutationVariables = Exact<{
  data: UpdateTodo;
  user: AuthenticatedUser;
}>;

export type UpdateToDoMutation = {
  __typename?: 'Mutation';
  updateToDo: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
  };
};

export type UpdateToDoStateMutationVariables = Exact<{
  data: UpdateTodoState;
  user: AuthenticatedUser;
}>;

export type UpdateToDoStateMutation = {
  __typename?: 'Mutation';
  updateToDoState: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
  };
};

export type DeleteToDoMutationVariables = Exact<{
  data: DeleteTodo;
  user: AuthenticatedUser;
}>;

export type DeleteToDoMutation = {
  __typename?: 'Mutation';
  deleteToDo: {
    __typename?: 'DeleteAndUpdateResponse';
    message?: string | null;
    error?: string | null;
  };
};

export type GetAllToDoQueryVariables = Exact<{
  data: AuthenticatedUser;
}>;

export type GetAllToDoQuery = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<{
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
    state: ToDoState;
  }>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  AuthenticatedUser: AuthenticatedUser;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeleteAndUpdateResponse: ResolverTypeWrapper<DeleteAndUpdateResponse>;
  DeleteTodo: DeleteTodo;
  Mutation: ResolverTypeWrapper<{}>;
  NewToDo: NewToDo;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ToDo: ResolverTypeWrapper<ToDo>;
  ToDoState: ToDoState;
  UpdateTodo: UpdateTodo;
  UpdateTodoState: UpdateTodoState;
  UserRegister: UserRegister;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResponse: AuthResponse;
  AuthenticatedUser: AuthenticatedUser;
  Boolean: Scalars['Boolean'];
  DeleteAndUpdateResponse: DeleteAndUpdateResponse;
  DeleteTodo: DeleteTodo;
  Mutation: {};
  NewToDo: NewToDo;
  Query: {};
  String: Scalars['String'];
  ToDo: ToDo;
  UpdateTodo: UpdateTodo;
  UpdateTodoState: UpdateTodoState;
  UserRegister: UserRegister;
};

export type AuthResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']
> = {
  jwt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteAndUpdateResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteAndUpdateResponse'] = ResolversParentTypes['DeleteAndUpdateResponse']
> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addNewToDo?: Resolver<
    Maybe<ResolversTypes['ToDo']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddNewToDoArgs, 'data' | 'user'>
  >;
  deleteToDo?: Resolver<
    ResolversTypes['DeleteAndUpdateResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteToDoArgs, 'data' | 'user'>
  >;
  login?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'data'>
  >;
  register?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'data'>
  >;
  updateToDo?: Resolver<
    ResolversTypes['DeleteAndUpdateResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateToDoArgs, 'data' | 'user'>
  >;
  updateToDoState?: Resolver<
    ResolversTypes['DeleteAndUpdateResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateToDoStateArgs, 'data' | 'user'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getAllTodosFromUser?: Resolver<
    Array<ResolversTypes['ToDo']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAllTodosFromUserArgs, 'data'>
  >;
};

export type ToDoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ToDo'] = ResolversParentTypes['ToDo']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ToDoState'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  DeleteAndUpdateResponse?: DeleteAndUpdateResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ToDo?: ToDoResolvers<ContextType>;
};

export const Register = gql`
  mutation Register($data: UserRegister!) {
    register(data: $data) {
      jwt
      message
    }
  }
`;
export const Login = gql`
  mutation Login($data: UserRegister!) {
    login(data: $data) {
      jwt
      message
    }
  }
`;
export const CreateNewTodo = gql`
  mutation createNewTodo($data: NewToDo!, $user: AuthenticatedUser!) {
    addNewToDo(data: $data, user: $user) {
      id
      title
      description
      state
    }
  }
`;
export const UpdateToDo = gql`
  mutation updateToDo($data: UpdateTodo!, $user: AuthenticatedUser!) {
    updateToDo(data: $data, user: $user) {
      message
      error
    }
  }
`;
export const UpdateToDoState = gql`
  mutation updateToDoState($data: UpdateTodoState!, $user: AuthenticatedUser!) {
    updateToDoState(data: $data, user: $user) {
      message
      error
    }
  }
`;
export const DeleteToDo = gql`
  mutation deleteToDo($data: DeleteTodo!, $user: AuthenticatedUser!) {
    deleteToDo(data: $data, user: $user) {
      message
      error
    }
  }
`;
export const GetAllToDo = gql`
  query GetAllToDo($data: AuthenticatedUser!) {
    getAllTodosFromUser(data: $data) {
      id
      title
      description
      state
    }
  }
`;
