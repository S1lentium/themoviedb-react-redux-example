export default class TheMovieDbAPI {
  private apiBaseUrl = "http://api.themoviedb.org/3";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getGenres = async () => {
    const response = await fetch(
      `${this.apiBaseUrl}/genre/movie/list?api_key=${this.apiKey}`,
    );
    return response.json();
  }

  public getPopularMovies = async (page: number = 1) => {
    const response = await fetch(
      `${this.apiBaseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`,
    );
    return response.json();
  }

  public getMovie = async (id: number) => {
    const response = await fetch(
      `${this.apiBaseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=recommendations`,
    );
    return response.json();
  }

  public searchMovies = async (query: string) => {
    const response = await fetch(
      `${this.apiBaseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`,
    );
    return response.json();
  }
}
