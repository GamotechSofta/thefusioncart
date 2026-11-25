import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <Router />
      {/* <div className='h-[100vh] text-center flex justify-center items-center '>
       <p className='border-2 border-red-500 p-5'>Site is under maintenance. Please check back later.
        </p> 
      </div> */}
     
    </BrowserRouter>
   
  );
}

export default App;
