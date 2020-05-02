import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { Source } from '../source/source.entity';
import { DateTime } from '../../graphql/ts/types';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // todo find out if there is possibility to have eager relation
  @OneToOne((type) => Source, { nullable: false })
  @JoinColumn()
  public source: Promise<Source>;

  @Column('varchar')
  public label: string;

  @CreateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public createdAt: DateTime;

  @UpdateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public updatedAt: DateTime;
}
