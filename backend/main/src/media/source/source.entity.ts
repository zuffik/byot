import {
  MediaType,
  Source as ISource,
  SourceType,
} from '../../graphql/ts/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Source implements ISource {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('enum', { enum: MediaType })
  public mediaType: MediaType;

  @Column('enum', { enum: SourceType })
  public sourceType: SourceType;

  @Column('varchar', { nullable: true })
  public thumbnail: string;

  @Column('varchar', { nullable: true })
  public url: string;
}
