import { RotatingTriangles } from 'react-loader-spinner';
import style from './Loader.module.css';

function Loader() {
  return (
    <div className={style.loaderWrapper}>
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangles-loading"
      />
    </div>
  );
}

export default Loader;
