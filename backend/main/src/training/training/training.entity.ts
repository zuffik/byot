import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime, Training as ITraining } from '../../graphql/ts/types';
import { User } from '../../user/user.entity';
import { TrainingSet } from '../training-set/training-set.entity';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { Media } from '../../media/media/media.entity';
import { PromiseRecord } from '../../helpers/PromiseRecord';

@Entity()
export class Training
  implements Partial<Omit<PromiseRecord<ITraining>, 'trainingSet'>> {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public label: string;

  @ManyToMany((type) => Media, { cascade: true })
  @JoinTable()
  public medias: Promise<Media[]>;

  public get owner(): Promise<User> {
    return new Promise<User>((resolve, reject) =>
      this.trainingSet
        .catch(reject)
        .then((ts: TrainingSet) =>
          ts.owner.catch(reject).then((u: User) => resolve(u)),
        ),
    );
  }

  @ManyToOne((type) => TrainingSet)
  public trainingSet: Promise<TrainingSet>;

  @CreateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public createdAt: DateTime;

  @UpdateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public updatedAt: DateTime;
}
