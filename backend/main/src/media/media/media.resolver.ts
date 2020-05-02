import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Media } from './media.entity';

@Resolver('Media')
export class MediaResolver {}
