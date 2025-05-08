import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastById } from '../../services/api';

import css from './MovieCast.module.css';
import defaultAvatar from '../../images/default-avatar.svg';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import { PiArrowCircleLeftBold, PiArrowCircleRightBold } from "react-icons/pi";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <PiArrowCircleRightBold
      className={className + ' ' + css.nextArrow}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <PiArrowCircleLeftBold
      className={className + ' ' + css.prevArrow}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <NextArrow/>,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 645,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 376,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const movieCast = await fetchMovieCastById(movieId);
        setMovieCast(movieCast);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieCast();
  }, [movieId]);

  return (
    <>
    {movieCast.length === 0 ? (
      <p className={css.noCastInfo}>No cast information available.</p>
    ) : (
      <Slider {...sliderSettings} className={css.movieCastList}>
        {movieCast.map(
          actor =>
            actor.order < 24 && (
              <div key={actor.id} className={css.movieCastItem}>
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : defaultAvatar}
                  alt={actor.name}
                  className={css.avatar}
                />
                <p className={css.actorName}>{actor.name}</p>
              </div>
            ),
        )}
      </Slider>
    )}
    </>
  );
};

export default MovieCast;
