
import { useEffect, useState } from 'react'
import './App.css'
import Display from './components/Display'
import Hero from './components/Hero'
import { accessFromLocalSession, storeInLocalSession } from './utils/localstorage'

const App=() =>{
  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    const mvList = accessFromLocalSession();
    mvList?.length && setMovieList(mvList);
  }, [])

  const addMovieToList = (movie) =>{
    //remove possible duplicate movie
    const tempMv = movieList.filter((item)=>item.imdbID !== movie.imdbID)
    setMovieList([...tempMv, movie]);
    storeInLocalSession([...tempMv, movie])
  }

  const handleOnDeleteMovie = (imdbID) =>{
    confirm("Are you sure you want to delete this movie from the list?") &&
    setMovieList(movieList.filter((mv)=> mv.imdbID !== imdbID));
  }

  return (
    <>
     <div className="wrapper">
      {/* hero section  */}
      <Hero addMovieToList={addMovieToList}/>
      {/* Display section  */}
      <Display movieList={movieList} handleOnDeleteMovie={handleOnDeleteMovie}/>

     </div>
    </>
  )
}

export default App
