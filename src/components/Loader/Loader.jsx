import { RotatingTriangles } from 'react-loader-spinner';

function Loader() {
  return (
    <RotatingTriangles
      visible={true}
      height="80"
      width="80"
      color="['#1B5299', '#EF8354', '#DB5461']"
      ariaLabel="rotating-triangles-loading"
      wrapperStyle={{}}
      wrapperClass="fidget-spinner-wrapper"
    />
  );
}
export default Loader;
