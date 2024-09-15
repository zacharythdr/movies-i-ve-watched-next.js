// components/MovieCard.tsx
import { IMovie } from "@/types/entity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface MovieCardProps {
  movie: IMovie;
  onDelete: (id: string) => Promise<void>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete }) => {
  return (
    <div className="bg-gray-800 text-gray-300 p-6 my-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:bg-gray-700">
      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
      <p className="mb-4">{movie.review}</p>
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>
            <FontAwesomeIcon
              icon={i < movie.rating ? solidStar : regularStar}
              className={i < movie.rating ? "text-yellow-500" : "text-gray-400"}
            />
          </span>
        ))}
      </div>
      <button
        className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded"
        onClick={() => onDelete(movie._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default MovieCard;
