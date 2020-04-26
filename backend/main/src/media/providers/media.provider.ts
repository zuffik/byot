import { Media, MediaFilter, SourceType } from '../../graphql/ts/types';

export interface MediaProvider {
  type: SourceType;

  findAll?(filter: MediaFilter): Promise<[Media[], number]>;

  parseFromUrl?(url: string): Promise<Media | undefined>;
}
