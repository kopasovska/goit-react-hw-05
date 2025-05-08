import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsById } from '../../services/api';
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { PiArrowCircleLeftBold, PiArrowCircleRightBold } from 'react-icons/pi';

import css from './MovieReviews.module.css';
import { formatDistanceToNow, parseISO } from 'date-fns';

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
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow/>,
  prevArrow: <PrevArrow />,
};

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const movieReviews = await fetchMovieReviewsById(movieId);
        setMovieReviews(movieReviews);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieReviews();
  }, [movieId]);

  return (<>
    {movieReviews.length === 0 ? (
      <p>No reviews information available.</p>
    ) : (
      <Slider {...sliderSettings} className={css.reviewList}>
      {movieReviews.map(review => (
        <div key={review.id} className={css.reviewItem}>
          <div className={css.reviewDetails}>
            <h3 className={css.authorName}>{review.author}</h3>
            <p className={css.createdAt}>{formatDistanceToNow(parseISO(review.created_at), { addSuffix: true })}</p>
          </div>
          <div className={css.reviewContent}>
            <ReadMoreReact
              text={review.content}
              min={100}
              ideal={200}
              max={250}
              readMoreText="Read more..."
            />
          </div>
        </div>
      ))}
      </Slider>
    )}
    </>
  
  );
};

export default MovieReviews;
