import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Item {
    product_id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    stock: number;
    image_url: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    items?: Item[];
    ziggy: Config & { location: string };
};
