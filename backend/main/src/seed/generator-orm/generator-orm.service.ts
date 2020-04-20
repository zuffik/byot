import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { GeneratorGraphqlService } from '../generator-graphql/generator-graphql.service';

@Injectable()
export class GeneratorOrmService {
  constructor(
    @Inject(GeneratorGraphqlService) private gqlGenerator: GeneratorGraphqlService,
  ) {
  }

  public user(): User {
    const gql = this.gqlGenerator.user();
    const user = new User();
    user.id = gql.id;
    user.email = gql.email;
    user.userName = gql.userName;
    user.firstName = gql.firstName;
    user.lastName = gql.lastName;
    user.role = gql.role;
    user.createdAt = gql.createdAt;
    user.updatedAt = gql.updatedAt;
    user.lastLogin = gql.lastLogin;
    return user;
  }
}
