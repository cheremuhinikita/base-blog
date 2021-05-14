import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { AuthorsService } from 'src/modules/authors/authors.service';
import { ParamsDto } from 'src/common/dto/params.dto';
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
	@ApiOperation({ summary: 'Create post' })
	@ApiBadRequestResponse({
		description: 'Invalid request body.',
	})
	@ApiNotFoundResponse({
		description: 'Author by id does not exists.',
	})
	@ApiCreatedResponse({
		description: 'The post has been successfully created.',
	})
	async create(
		@Body() { authorId, ...createPostDto }: CreateOrUpdatePostDto,
	): Promise<PostEntity> {
		const author = await this.authorsService.findOne(authorId);

		return this.postsService.create(createPostDto, author);
	}

	@Get()
	@ApiOperation({ summary: 'Find all posts' })
	@ApiOkResponse({
		description: 'Found all posts.',
	})
	findAll(): Promise<PostEntity[]> {
		return this.postsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find post by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param.',
	})
	@ApiNotFoundResponse({
		description: 'Post by id does not exists.',
	})
	@ApiOkResponse({
		description: 'Found post.',
	})
	findOne(@Param() { id }: ParamsDto): Promise<PostEntity> {
		return this.postsService.findOne(id, true);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update post by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param or request body.',
	})
	@ApiNotFoundResponse({
		description: 'Author or post by id does not exists.',
	})
	@ApiOkResponse({
		description: 'The post has been successfully updated.',
	})
	async update(
		@Param() { id }: ParamsDto,
		@Body() { authorId, ...updatePostDto }: CreateOrUpdatePostDto,
	): Promise<PostEntity> {
		const existPost = await this.postsService.findOne(id);
		const author = await this.authorsService.findOne(authorId);

		return this.postsService.update(existPost, updatePostDto, author);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete post by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param.',
	})
	@ApiNotFoundResponse({
		description: 'Post by id does not exists.',
	})
	@ApiOkResponse({
		description: 'The author has been successfully deleted.',
	})
	async remove(@Param() { id }: ParamsDto): Promise<void> {
		const existPost = await this.postsService.findOne(id);

		return this.postsService.remove(existPost);
	}
}
