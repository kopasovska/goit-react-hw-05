import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ clickHandler }) => {
  return (
    <button onClick={clickHandler} type="button" className={css.loadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
