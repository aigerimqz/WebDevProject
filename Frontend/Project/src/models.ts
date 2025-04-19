export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
    release_year: number;
    image_url: string;
}

export interface Cinema {
    id: number;
    name: string;
    location: string;
    image_url: string;
}