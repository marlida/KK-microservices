export interface Category {
	id: number;
	name?: string;
	brandId?: number;
	createdAt: string;
	updatedAt: string;
	brand: {
		createdAt: string;
		id: number;
		name: string;
		updatedAt: string;
	};
}

export type CategoryCreatePayload = {
	name: string;
	brandId: number;
};
