import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchMoviesRequest } from "../redux/allMovies/AllMoviesActions";
import { CallApi } from "../utilits/CallApi";
import Movie from "./movie/Movie";


const AllMovies = () => {
  const dispatch = useDispatch();
  const { page } = useParams()
  // useEffect(() => {
  //   dispatch(fetchMoviesRequest(page));
  // }, [page]);
  // const movies = useSelector((res) => {
  //   return res.movies;
  // });
  const [movies, setMovies] = useState([])
  const onSuccess = (data) => {
    console.log("Sucess msg", data);
    // setUsers(data)
    setMovies(data?.data.results)
  }
  const onError = (error) => {
    console.log("Error msg");
  }
  const { data, isLoading, isFetching, refetch } = CallApi('allMovies',

    {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&`,
      params: {
        page: page
      },
    },
    {
      onError,
      onSuccess,
    }
  )
  // console.log(movies, isLoading);
  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-5">Popular movies</h1>
      <div className="row gy-3 text-center gx-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {movies.map((movie) => (
              <Movie movie={movie} key={movie.id} page={page} />))}
            <div className="position-relative">
              {page > 1 && (
                <div className="d-flex justify-content-between ">
                  <Link to={`/movie-app/popularmovies/${+page - 1}`} >
                    <button onClick={refetch} className="btn btn-dark  px-4 mt-3 ms-3 position-fixed bottom-0 start-0 shadow rounded-pill  ">
                      <FaArrowLeft /> Prev {+page - 1}</button>
                  </Link>
                </div>
              )
              }
              <Link to={`/movie-app/popularmovies/${+page + 1}`}>
                <button onClick={refetch} className="btn btn-dark px-4 mx-auto  position-fixed me-3 bottom-0  end-0 shadow rounded-pill ">next {+page + 1} <FaArrowRight /></button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div >
  );
}

export default AllMovies;
