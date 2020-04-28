import { DateTime, TrainingSet as ITrainingSet } from '../../graphql/ts/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { PromiseRecord } from '../../helpers/PromiseRecord';
import { Training } from '../training/training.entity';

@Entity()
export class TrainingSet
  implements Omit<PromiseRecord<ITrainingSet>, 'trainings'> {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public label: string;

  @ManyToOne((type) => User)
  public owner: Promise<User>;

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
