import React from "react";
import styles from "./moviecard.module.css";

// Define the type for the 'item' prop
interface MovieItem {
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
}

// Define the type for the props of the MovieCard component
interface MovieCardProps {
  item: MovieItem;
}

// Define the MovieCard component with the specified prop types
const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  return (
    <div className={styles.movieCardWrapper}>
      <div className={styles.movieImageWrapper}>
        <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.title} />
      </div>
      <div className={styles.moviTitleWrapper}>
        <div>
          <h3 className="announce-item">{item.title}</h3>
          <p className="announce-item">{item.release_date}</p>
          <p className="announce-item">Rating: {item.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
