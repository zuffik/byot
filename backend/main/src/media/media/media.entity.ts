import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { Source } from '../source/source.entity';
import { Training } from '../../training/training/training.entity';
import { DateTime, Media as IMedia } from '../../graphql/ts/types';

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
