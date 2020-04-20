import { Module } from '@nestjs/common';
import { GeneratorOrmService } from './generator-orm/generator-orm.service';
import { GeneratorGraphqlService } from './generator-graphql/generator-graphql.service';

@Module({
  providers: [GeneratorGraphqlService, GeneratorOrmService],
  exports: [GeneratorGraphqlService, GeneratorOrmService],
})
export class SeedModule {}
