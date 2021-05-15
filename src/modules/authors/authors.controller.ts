import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	ApiCreate,
	ApiDelete,
	ApiFindAll,
	ApiFindOne,
	ApiUpdate,
} from 'src/common/decorators/swagger.decorators';
import { ParamsDto } from 'src/common/dto/params.dto';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateOrUpdateAuthorDto } from './dto/create-or-update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
	constructor(private readonly authorsService: AuthorsService) {}

	@Post()
	@ApiCreate('author', Author)
	create(@Body() createAuthorDto: CreateOrUpdateAuthorDto): Promise<Author> {
		return this.authorsService.create(createAuthorDto);
	}

	@Get()
	@ApiFindAll('author', [Author])
	findAll(): Promise<Author[]> {
		return this.authorsService.findAll();
	}

	@Get(':id')
	@ApiFindOne('author', Author)
	findOne(@Param() { id }: ParamsDto): Promise<Author> {
		return this.authorsService.findOne(id, true);
	}

	@Put(':id')
	@ApiUpdate('author', Author)
	async update(
		@Param() { id }: ParamsDto,
		@Body() updateAuthorDto: CreateOrUpdateAuthorDto,
	): Promise<Author> {
		const existAuthor = await this.authorsService.findOne(id);

		return this.authorsService.update(existAuthor, updateAuthorDto);
	}

	@Delete(':id')
	@ApiDelete('author', Author)
	async remove(@Param() { id }: ParamsDto): Promise<Author> {
		const existAuthor = await this.authorsService.findOne(id);

		return this.authorsService.remove(existAuthor);
	}
}
