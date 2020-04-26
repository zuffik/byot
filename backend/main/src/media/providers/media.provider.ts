import { Media, MediaFilter } from '../../graphql/ts/types';

export interface MediaProvider {
  findAll?(filter: MediaFilter): Promise<[Media[], number]>;

  parseFromUrl?(url: string): Promise<Media | undefined>;
}
