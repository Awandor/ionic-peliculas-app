export interface RespuestaMDB {
    page: number;
    total_results: number;
    total_pages: number;
    results: Pelicula[];
}

export interface Pelicula {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface PeliculaDetalle {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: any;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Productioncompany[];
    production_countries?: Productioncountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: Spokenlanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface Spokenlanguage {
    iso_639_1: string;
    name: string;
}

export interface Productioncountry {
    iso_3166_1: string;
    name: string;
}

export interface Productioncompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface PeliculaActores {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
}

export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
}

export interface SearchResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: Result[];
}

export interface Result {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path?: string;
    id: number;
    adult: boolean;
    backdrop_path?: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface ActorDetalle {
    birthday: string;
    known_for_department: string;
    deathday?: any;
    id: number;
    name: string;
    also_known_as: string[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage?: any;
}

export interface ActorPeliculas {
    cast: ActorCast[];
    crew: any[];
    id: number;
}

export interface ActorCast {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    id: number;
    backdrop_path?: string;
    overview: string;
    poster_path: string;
}

export interface Generos {
    genres: Genre[];
}
