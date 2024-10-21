import React, { useEffect, useRef, useState } from "react";
import { MovieCard } from "./MovieCard";
import { fetchFromAPI } from "../utils/axios";
import { randomChar } from "../utils/random";

const Hero = ({addMovieToList}) => {
  const [searchedMovie, setSearchedMovie] = useState({});
  const [bgImg, setBgImg] = useState("");
  const shouldFetchRef = useRef(true);
  const searchRef = useRef("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (shouldFetchRef.current) {
      fetchMovie(randomChar());
      shouldFetchRef.current = false;
    }
  }, []);

  const fetchMovie = async (str) => {
    const movie = await fetchFromAPI(str);
    setSearchedMovie(movie);
    setBgImg(movie.Poster);
    setSearching(false); 
  };

  const handleOnMovieSearch = () => {
    const str = searchRef.current.value;
    fetchMovie(str);
    searchRef.current.value = "";
  };

  const handleOnDelete = () =>{
    setSearchedMovie({});
    setSearching(true);
  }

  const handleOnAddToList = mood =>{
    addMovieToList({...searchedMovie, mood})
    setSearchedMovie({});
    setSearching(true);
  }

  const movieStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <>
      <div>
        <nav className="py-3 text-danger fixed">
          <h2 className="container">MovieWorld</h2>
        </nav>

        <div
          className="hero d-flex justify-content-center align-items-center text-light"
          style={movieStyle}
        >
          <div className="hero-content">
            <div className={searching ? "form-center" : "form-top"}>
              {searching && (
                <div className="text-center">
                  <h1>Search Millions of Movies</h1>
                  <p>
                    Find out more about the movie in the details before watching
                    them...
                  </p>
                </div>
              )}
            </div>

            <div className="input-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search movies"
                aria-label="Search movies"
                aria-describedby="button-addon2"
                ref={searchRef}
                onFocus={() => setSearching(true)}
              />
              <button
                onClick={handleOnMovieSearch}
                className="btn btn-danger"
                type="button"
                id="button-addon2"
              >
                search
              </button>
            </div>

            {!searching && (
              <div className="movie-card-display showMovie">
                <MovieCard searchedMovie={searchedMovie} deleteFunc = {handleOnDelete} handleOnAddToList={handleOnAddToList}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
