import {
  MediaType,
  Source as ISource,
  SourceType,
} from '../../graphql/ts/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Media } from '../media/media.entity';

@Entity()
export class Source implements ISource {
  @Column('varchar', { primary: true })
  public resourceId: string;

  @Column('enum', { enum: MediaType, primary: true })
  public mediaType: MediaType;

  @Column('enum', { enum: SourceType, primary: true })
  public sourceType: SourceType;

  @Column('varchar', { nullable: true })
  public thumbnail: string;

  @Column('varchar', { nullable: true })
  public url: string;

  @OneToOne((type) => Media, (media) => media.source, { nullable: false })
  @JoinColumn()
  public media: Promise<Media>;
}
