import {DocumentNode, gql} from 'apollo-boost';

export const fullMediaFragment = (): DocumentNode => gql`
  fragment fullMedia on Media {
    id
    createdAt {
      humanReadable
      iso
    }
    label
    source {
      id
      mediaType
      resourceId
      sourceType
      thumbnail
      url
    }
  }
`;
