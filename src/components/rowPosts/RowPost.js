import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from'../../axios'
import { imageUrl, API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'



function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId] = useState('')
useEffect(() => {
    axios.get(props.url).then((response)=>{
      setMovies(response.data.results)
    }).catch(err=>{
      // alert("network error")
    })
  }, [props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovies = (id) => {
    // Try movie videos first
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        // If no movie videos found, try TV show videos
        return axios.get(`tv/${id}/videos?api_key=${API_KEY}&language=en-US`);
      }
    })
    .then((response) => {
      if (response && response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else if (response) {
        console.log("No videos found for this ID");
      }
    })
    .catch((error) => {
      console.error("Error fetching trailers:", error);
    });
  };

  const handleCloseButton = () => {
    setUrlId(null);
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          movies.map((obj) =>
            <img 
              onClick={() => handleMovies(obj.id)} 
              key={obj.id} 
              className={props.isSmall ? 'smallPosters' : 'poster'} 
              src={`${imageUrl + obj.backdrop_path}`} 
              alt={obj.name || obj.title} 
            />
          )
        }
      </div>
      <div className='youtubeTab'>
        {urlId && <button className="closebutton" onClick={handleCloseButton}>X close video</button>}
        {urlId && <Youtube opts={opts} videoId={urlId.key} />}
      </div>
    </div>
  )
}

export default RowPost