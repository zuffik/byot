import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { Source } from '../source/source.entity';
import { DateTime } from '../../graphql/ts/types';
import { Training } from '../../training/training/training.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne((type) => Source, (source) => source.media, { nullable: false })
  public source: Promise<Source>;

  @Column('varchar')
  public label: string;

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
