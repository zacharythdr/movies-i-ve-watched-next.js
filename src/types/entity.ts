export interface IMovie {
  _id: string;
  title: string;
  review: string;
  rating: number;
  createdAt: number;
}

export interface IMovieResult {
  data: IMovie[];
}
