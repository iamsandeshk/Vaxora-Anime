
export interface AnimeDetails {
  id: number;
  title: string;
  image: string;
  coverImage?: string;
  genres: string[];
  rating: number;
  episodes: number;
  studio: string;
  description: string;
  trailerUrl?: string;
  year?: number;
  status?: 'Airing' | 'Finished' | 'Not yet aired';
}

export interface AnimeSearchResult {
  id: number;
  title: string;
  image: string;
  genres: string[];
  rating: number;
  year?: number;
}

export interface AnimeApiResponse {
  data: AnimeSearchResult[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    total_pages: number;
  }
}
