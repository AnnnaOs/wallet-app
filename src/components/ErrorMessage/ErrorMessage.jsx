
import { ToastContainer, toast } from 'react-toastify';

function ErrorMessage(){
  const notify = () => toast("Something wrong!");

  return (
    <div>
      <ToastContainer />
      <button onClick={notify}>Ok</button>
    </div>
  );
}
export default ErrorMessage;