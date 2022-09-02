import { extractFragmentReplacements } from 'graphql-binding';
import Query from './Query';
import Mutation from './Mutation';
import User from './User';
import School from './School';
import Admin from './Admin';

const resolvers = {
  Query,
  Mutation,
  User,
  School,
  Admin,
};

export { resolvers };
