import { DateTime, Role } from '../graphql/ts/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../helpers/TimestampToDateTime';
import { Token } from './token/token.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', { unique: true })
  public email: string;

  @Column('varchar', { unique: true })
  public userName: string;

  @Column('varchar', { nullable: true })
  public firstName: string;

  @Column('varchar', { nullable: true })
  public lastName: string;

  @Column('varchar')
  public password: string;

  @Column('enum', { enum: Role, default: Role.USER })
  public role: Role;

  @OneToMany((type) => Token, (token) => token.user)
  public tokens: Promise<Token[]>;

  public get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

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
  })
  public lastLogin: DateTime;
}
