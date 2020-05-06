import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../../helpers/TimestampToDateTime';
import { DateTime, TokenType } from '../../graphql/ts/types';
import { User } from '../user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('char', { length: 32 })
  public token: string;

  @Column('boolean', { default: true })
  public valid: boolean;

  @Column('enum', { enum: TokenType })
  public tokenType: TokenType;

  @CreateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public createdAt: DateTime;

  @UpdateDateColumn({
    transformer: timestampToDateTimeORMTransformer,
  })
  public updatedAt: DateTime;

  @Column('datetime', {
    transformer: timestampToDateTimeORMTransformer,
    nullable: true,
    default: null,
  })
  public validUntil: DateTime;

  @ManyToOne((type) => User, (user) => user.tokens, { nullable: false })
  @JoinColumn()
  public user: User;
}
