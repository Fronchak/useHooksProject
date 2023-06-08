import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FlashMessageComponent from '../../components/FlashMessageComponent';

const Root = () => {
  return (
    <>
      <Navbar />
      <FlashMessageComponent />
      <div className="container py-3" id="main-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;
