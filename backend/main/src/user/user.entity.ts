import { DateTime, Role, User as IUser } from '../graphql/ts/types';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { timestampToDateTimeORMTransformer } from '../helpers/TimestampToDateTime';

@Entity()
export class User implements IUser {
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

  @Column('enum', { enum: Role })
  public role: Role;

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
