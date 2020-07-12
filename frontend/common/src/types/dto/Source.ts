import {ISource} from '../interfaces/ISource';
import {MediaType} from '../enums/MediaType';
import {SourceType} from '../enums/SourceType';

export class Source implements ISource {
  public id: string;
  public mediaType: MediaType;
  public resourceId: string;
  public sourceType: SourceType;
  public thumbnail: string;
  public url: string;
  constructor({id, mediaType, resourceId, sourceType, thumbnail, url}: ISource) {
    this.id = id;
    this.mediaType = mediaType;
    this.resourceId = resourceId;
    this.sourceType = sourceType;
    this.thumbnail = thumbnail;
    this.url = url;
  }
}
