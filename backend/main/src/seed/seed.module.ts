import { Module } from '@nestjs/common';
import { GeneratorOrmService } from './generator-orm/generator-orm.service';
import { GeneratorGraphqlService } from './generator-graphql/generator-graphql.service';
import { GeneratorOtherService } from './generator-other/generator-other.service';

@Module({
  providers: [
    GeneratorGraphqlService,
    GeneratorOrmService,
    GeneratorOtherService,
  ],
  exports: [
    GeneratorGraphqlService,
    GeneratorOrmService,
    GeneratorOtherService,
  ],
})
export class SeedModule {}
