import { BeatLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <BeatLoader
        color="pink"
        loading="true"
        // cssOverride={override}
        size={26}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
