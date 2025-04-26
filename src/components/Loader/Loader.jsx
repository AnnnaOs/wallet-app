import { FidgetSpinner } from "react-loader-spinner";

function Loader() {
  return (
    <div style={{
      position: 'fixed', // перекрывает весь экран
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.6)', // можно полупрозрачный фон
      zIndex: 9999 // чтобы перекрыть всё
    }}>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
      />
    </div>
  );
}

export default Loader;
