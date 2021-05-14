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

import { ParamsDto } from 'src/common/dto/params.dto';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateOrUpdateAuthorDto } from './dto/create-or-update-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
	constructor(private readonly authorsService: AuthorsService) {}

	@Post()
	@ApiOperation({ summary: 'Create author' })
	@ApiBadRequestResponse({
		description: 'Invalid request body.',
	})
	@ApiCreatedResponse({
		description: 'The author has been successfully created.',
	})
	create(@Body() createAuthorDto: CreateOrUpdateAuthorDto): Promise<Author> {
		return this.authorsService.create(createAuthorDto);
	}

	@Get()
	@ApiOperation({ summary: 'Find all authors' })
	@ApiOkResponse({
		description: 'Found all authors.',
	})
	findAll(): Promise<Author[]> {
		return this.authorsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Find author by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param.',
	})
	@ApiNotFoundResponse({
		description: 'Author by id does not exists.',
	})
	@ApiOkResponse({
		description: 'Found author.',
	})
	findOne(@Param() { id }: ParamsDto): Promise<Author> {
		return this.authorsService.findOne(id, true);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update author by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param or request body.',
	})
	@ApiNotFoundResponse({
		description: 'Author by id does not exists.',
	})
	@ApiOkResponse({
		description: 'The author has been successfully updated.',
	})
	async update(
		@Param() { id }: ParamsDto,
		@Body() updateAuthorDto: CreateOrUpdateAuthorDto,
	): Promise<Author> {
		const existAuthor = await this.authorsService.findOne(id);

		return this.authorsService.update(existAuthor, updateAuthorDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete author by id' })
	@ApiParam({ type: 'number', name: 'id' })
	@ApiBadRequestResponse({
		description: 'Invalid id param.',
	})
	@ApiNotFoundResponse({
		description: 'Author by id does not exists.',
	})
	@ApiOkResponse({
		description: 'The author has been successfully deleted.',
	})
	async remove(@Param() { id }: ParamsDto): Promise<void> {
		const existAuthor = await this.authorsService.findOne(id);

		return this.authorsService.remove(existAuthor);
	}
}
