import { GraphQLClient } from 'graphql-request';

const graphQlClient = new GraphQLClient(
  process.env['NEXT_PUBLIC_API_ENDPOINT'] || ''
);

export default graphQlClient;
