import ErrorComponent from "../../components/ErrorComponent";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="container py-3" id="main-container">
        <ErrorComponent />
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
