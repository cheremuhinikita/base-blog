import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/modules/authors/entities/author.entity';
import { Post } from './entities/post.entity';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostsService {
	constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

	create(newPost: Omit<IPost, 'author'>, author: Author): Promise<Post> {
		const createdPost = this.postsRepository.create({
			...newPost,
			author,
		});

		return this.postsRepository.save(createdPost);
	}

	findAll(): Promise<Post[]> {
		return this.postsRepository.find({ relations: ['author'] });
	}

	async findOne(id: number, withRelations = false): Promise<Post> {
		const post = await this.postsRepository.findOne(
			id,
			withRelations ? { relations: ['author'] } : undefined,
		);

		if (!post) {
			throw new NotFoundException(`Post by id #${id} does not exists`);
		}

		return post;
	}

	update(post: Post, updates: Omit<IPost, 'author'>, author: Author): Promise<Post> {
		const updatedPost = this.postsRepository.merge(post, {
			...updates,
			author,
		});

		return this.postsRepository.save(updatedPost);
	}

	async remove(post: Post): Promise<void> {
		await this.postsRepository.remove(post);
	}
}
