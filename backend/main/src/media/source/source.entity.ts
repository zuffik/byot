import {
  MediaType,
  Source as ISource,
  SourceType,
} from '../../graphql/ts/types';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from '../media/media.entity';

@Entity()
export class Source implements ISource {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public mediaId: string;

  @Column('enum', { enum: MediaType })
  public mediaType: MediaType;

  @Column('enum', { enum: SourceType })
  public sourceType: SourceType;

  @Column('varchar', { nullable: true })
  public thumbnail: string;

  @Column('varchar', { nullable: true })
  public url: string;
}
