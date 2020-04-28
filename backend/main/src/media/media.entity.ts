import { DateTime, Media as IMedia } from '../graphql/ts/types';
import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../helpers/TimestampToDateTime';
import { Source } from './source.entity';
import { Training } from '../training/training/training.entity';

@Entity()
export class Media implements IMedia {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne((type) => Source)
  public source: Source;

  @ManyToMany((type) => Training, (t) => t.medias)
  public trainings: Promise<Training[]>;

  @CreateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public createdAt: DateTime;

  @UpdateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public updatedAt: DateTime;
}
