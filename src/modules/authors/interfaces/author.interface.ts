import { IPost } from 'src/modules/posts/interfaces/post.interface';

export interface IAuthor {
	name: string;
	username: string;
	email: string;
	address?: string;
	website?: string;
	posts: IPost[];
}
