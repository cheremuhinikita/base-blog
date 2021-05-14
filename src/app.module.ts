import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmRootModule } from 'src/common/modules/typeorm-root.module';
import { AuthorsModule } from 'src/modules/authors/authors.module';
import { PostsModule } from 'src/modules/posts/posts.module';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmRootModule, AuthorsModule, PostsModule],
})
export class AppModule {}
