import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Author } from 'src/modules/authors/entities/author.entity';
import { IPost } from '../interfaces/post.interface';

@Entity()
export class Post extends BaseEntity implements IPost {
	@Column()
	title: string;

	@Column()
	body: string;

	@ManyToOne(() => Author, (author) => author.posts, {
		onDelete: 'CASCADE',
	})
	author: Author;
}
