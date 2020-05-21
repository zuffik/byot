import {gql} from 'apollo-boost';
import {fullUserFragment} from './FullUserFragment';

export const fullAuthFragment = () => gql`
  ${fullUserFragment()}
  fragment fullAuthFragment on Auth {
    token
    user {
      ...fullUser
    }
  }
`;
