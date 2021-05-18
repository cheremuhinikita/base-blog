import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';
import { IAuthor } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
	constructor(
		@InjectRepository(Author)
		private readonly authorsRepository: Repository<Author>,
	) {}

	create(newAuthor: Omit<IAuthor, 'posts'>): Promise<Author> {
		const author = this.authorsRepository.create(newAuthor);

		return this.authorsRepository.save(author);
	}

	findAll(): Promise<Author[]> {
		return this.authorsRepository.find({ relations: ['posts'] });
	}

	async findOne(id: number, withRelations = false): Promise<Author> {
		const author = await this.authorsRepository.findOne(
			id,
			withRelations ? { relations: ['posts'] } : undefined,
		);
		if (!author) {
			throw new NotFoundException(`Author by id #${id} does not exists`);
		}

		return author;
	}

	update(author: Author, updates: Omit<IAuthor, 'posts'>): Promise<Author> {
		const updatedAuthor = this.authorsRepository.merge(author, updates);

		return this.authorsRepository.save(updatedAuthor);
	}

	remove(author: Author): Promise<Author> {
		return this.authorsRepository.remove(author);
	}
}
