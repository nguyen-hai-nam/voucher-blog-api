import { Post } from '@prisma/client';

export interface MetaData {
	id: string;
	name: string;
	avatar_image_url: string;
	address_name: string;
	distance: number;
	is_followed: boolean;
}

export interface NewsfeedItem extends Omit<Post, 'business_id'> {
	meta: MetaData;
}

export interface BusinessSuggestion {
	id: string;
	name: string;
	avatar_image_url: string;
	address_name: string;
	distance: number;
}
