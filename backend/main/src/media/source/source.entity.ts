import {
  MediaType,
  Source as ISource,
  SourceType,
} from '../../graphql/ts/types';
import { Column, Entity } from 'typeorm';

@Entity()
export class Source implements ISource {
  @Column('varchar', { primary: true })
  public id: string;

  @Column('enum', { enum: MediaType })
  public mediaType: MediaType;

  @Column('enum', { enum: SourceType, primary: true })
  public sourceType: SourceType;

  @Column('varchar', { nullable: true })
  public thumbnail: string;

  @Column('varchar', { nullable: true })
  public url: string;
}
