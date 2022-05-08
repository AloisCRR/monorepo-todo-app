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

export type AddNewToDo = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt: Scalars['String'];
};

export type AuthenticatedUser = {
  jwt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewToDo: ToDo;
  register: AuthResponse;
};

export type MutationAddNewToDoArgs = {
  data?: InputMaybe<AddNewToDo>;
  user?: InputMaybe<AuthenticatedUser>;
};

export type MutationRegisterArgs = {
  data: UserRegister;
};

export type Query = {
  __typename?: 'Query';
  getAllTodosFromUser: Array<Maybe<ToDo>>;
};

export type QueryGetAllTodosFromUserArgs = {
  data: AuthenticatedUser;
};

export type ToDo = {
  __typename?: 'ToDo';
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
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
  register: { __typename?: 'AuthResponse'; jwt: string };
};

export type CreateNewTodoMutationVariables = Exact<{
  data: AddNewToDo;
  user: AuthenticatedUser;
}>;

export type CreateNewTodoMutation = {
  __typename?: 'Mutation';
  addNewToDo: {
    __typename?: 'ToDo';
    id: string;
    title: string;
    description: string;
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
  } | null>;
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
  AddNewToDo: AddNewToDo;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  AuthenticatedUser: AuthenticatedUser;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ToDo: ResolverTypeWrapper<ToDo>;
  UserRegister: UserRegister;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddNewToDo: AddNewToDo;
  AuthResponse: AuthResponse;
  AuthenticatedUser: AuthenticatedUser;
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  ToDo: ToDo;
  UserRegister: UserRegister;
};

export type AuthResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']
> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addNewToDo?: Resolver<
    ResolversTypes['ToDo'],
    ParentType,
    ContextType,
    Partial<MutationAddNewToDoArgs>
  >;
  register?: Resolver<
    ResolversTypes['AuthResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'data'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getAllTodosFromUser?: Resolver<
    Array<Maybe<ResolversTypes['ToDo']>>,
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
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ToDo?: ToDoResolvers<ContextType>;
};

export const Register = gql`
  mutation Register($data: UserRegister!) {
    register(data: $data) {
      jwt
    }
  }
`;
export const CreateNewTodo = gql`
  mutation createNewTodo($data: AddNewToDo!, $user: AuthenticatedUser!) {
    addNewToDo(data: $data, user: $user) {
      id
      title
      description
    }
  }
`;
export const GetAllToDo = gql`
  query GetAllToDo($data: AuthenticatedUser!) {
    getAllTodosFromUser(data: $data) {
      id
      title
      description
    }
  }
`;
