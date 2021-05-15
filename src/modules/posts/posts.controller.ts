import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import {
	ApiCreate,
	ApiDelete,
	ApiFindAll,
	ApiFindOne,
	ApiUpdate,
} from 'src/common/decorators/swagger.decorators';
import { ParamsDto } from 'src/common/dto/params.dto';
import { AuthorsService } from 'src/modules/authors/authors.service';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { CreateOrUpdatePostDto } from './dto/create-or-update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
	constructor(
		private readonly authorsService: AuthorsService,
		private readonly postsService: PostsService,
	) {}

	@Post()
	@ApiCreate('post', PostEntity)
	@ApiNotFoundResponse({
		description: 'Author by id does not exists.',
	})
	async create(
		@Body() { authorId, ...createPostDto }: CreateOrUpdatePostDto,
	): Promise<PostEntity> {
		const author = await this.authorsService.findOne(authorId);

		return this.postsService.create(createPostDto, author);
	}

	@Get()
	@ApiFindAll('post', [PostEntity])
	findAll(): Promise<PostEntity[]> {
		return this.postsService.findAll();
	}

	@Get(':id')
	@ApiFindOne('post', PostEntity)
	findOne(@Param() { id }: ParamsDto): Promise<PostEntity> {
		return this.postsService.findOne(id, true);
	}

	@Put(':id')
	@ApiUpdate('post', PostEntity, ['author'])
	async update(
		@Param() { id }: ParamsDto,
		@Body() { authorId, ...updatePostDto }: CreateOrUpdatePostDto,
	): Promise<PostEntity> {
		const existPost = await this.postsService.findOne(id);
		const author = await this.authorsService.findOne(authorId);

		return this.postsService.update(existPost, updatePostDto, author);
	}

	@Delete(':id')
	@ApiDelete('post', PostEntity)
	async remove(@Param() { id }: ParamsDto): Promise<PostEntity> {
		const existPost = await this.postsService.findOne(id);

		return this.postsService.remove(existPost);
	}
}
