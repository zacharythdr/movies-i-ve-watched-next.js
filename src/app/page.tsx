// pages/index.tsx (or Page.tsx)
"use client";
import { useEffect, useState } from "react";
import { fetchData, deleteMovie } from "@/lib/fetch";
import { IMovie, IMovieResult } from "@/types/entity";
import MovieCard from "@/components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const API_URL = "https://v1.appbackend.io/v1/rows/pw5dRPLwPNES";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchData<IMovieResult>(API_URL);
      if (data) {
        setMovies(data.data);
      }
    }
    loadMovies();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMovie(id, API_URL);
    setMovies(movies.filter((movie) => movie._id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ title, review, rating: selectedRating }]),
      });
      setTitle("");
      setReview("");
      setSelectedRating(0);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-[#181818]">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        Movies I&apos;ve Watched 🍿
      </h1>
      <h2 className="text-xl text-gray-300 mb-8">
        Collection of movies I&apos;ve watched, a sneak peek of my taste in film
      </h2>

      <div className="flex items-start">
        <div className="w-1/3 flex-shrink-0 bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-300 mb-4">Add Movie</h3>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-400 mb-2">Title:</label>
            <input
              className="w-full p-2 mb-4 bg-gray-800 border border-gray-300 text-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <label className="block text-gray-400 mb-2">Thoughts:</label>
            <textarea
              className="w-full p-2 mb-4 bg-gray-800 border border-gray-300 text-gray-300 rounded"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Review"
            />
            <label className="block text-gray-400 mb-2">Rating:</label>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setSelectedRating(i + 1)}
                >
                  <FontAwesomeIcon
                    icon={i < selectedRating ? solidStar : regularStar}
                    className={
                      i < selectedRating ? "text-yellow-500" : "text-gray-400"
                    }
                  />
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Add Review
            </button>
          </form>
        </div>

        <div className="w-2/3 ml-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
