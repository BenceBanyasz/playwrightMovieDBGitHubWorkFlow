export interface UsersList {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
    }[];
    support: {
        url: string;
        text: string;
    };
}

export interface UserProfile {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: string | null;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}
export interface PostRating {
    page: number;
    results: {
        adult: boolean;
        backdrop_path: string | null;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string | null;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        rating: number;
    }[];
    total_pages: number;
    total_results: number;
}

export interface DeleteRating {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
}
