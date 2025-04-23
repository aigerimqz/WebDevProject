export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
    release_year: number;
    release_date: string;
    image_url: string;
    duration: string;
    banner?: string;
}

export interface Cinema {
    id: number;
    name: string;
    location: string;
    image_url: string;
}


export interface Screening {
    id: number;
    movieId: number;
    cinemaId: number;
    date: string;
    time: string;
    price: number;
    
}

export interface User {
    id?: number;
    username?: string;
    email: string;
    password: string;
    
}