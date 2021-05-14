import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { IAuthor } from '../interfaces/author.interface';

@Entity()
export class Author extends BaseEntity implements IAuthor {
	@Column()
	name: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
	website: string;

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[];
}
