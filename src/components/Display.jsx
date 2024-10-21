import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

const Display = ({movieList, handleOnDeleteMovie}) => {
  const [displayList, setDisplayList] = useState([]);
  useEffect(()=>{
    setDisplayList(movieList);
  }, [movieList]);

  const handleOnFilter = mood =>{
    if(mood==='all')
    {
      return setDisplayList(movieList)
    }

    const filterMv = movieList.filter((mv)=>mv.mood === mood) ;
    setDisplayList(filterMv)
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="bg-dark p-3 rounded">
        <div className="row">
          <div className="col">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button onClick={()=>handleOnFilter('all')} type="button" className="btn btn-danger">
                All
              </button>
              <button onClick={()=>handleOnFilter('drama')} type="button" className="btn btn-warning">
                Drama
              </button>
              <button onClick={()=>handleOnFilter('action')} type="button" className="btn btn-info">
                Action
              </button>
            </div>
            <div className="mt-3 text-light">{displayList.length} movies listed</div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col d-flex justify-content-around gap-2 flex-wrap">
            {
              displayList.map((item, i)=>(
                <div key={i} className="div">
                  <MovieCard deleteFunc={handleOnDeleteMovie} searchedMovie={item}/>
                </div>                
              ))
            }
            
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default Display;
