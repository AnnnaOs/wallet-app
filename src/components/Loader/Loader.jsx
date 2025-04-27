import { RotatingTriangles } from 'react-loader-spinner';

function Loader() {
  return (
    <RotatingTriangles
      visible={true}
      height="80"
      width="80"
      ariaLabel="rotating-triangles-loading"
    />
  );
}

export default Loader;
