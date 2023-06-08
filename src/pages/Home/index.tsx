import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to the home</h1>
      <p className="mb-4">This was develop using the <a target='_blank' href="https://jsonplaceholder.typicode.com/">Fake API</a></p>
      <img src="src/assets/imgs/fake_api.PNG" className="img-fluid mb-3"/>
      <p><Link to="/posts">Click here</Link> to see all Posts</p>
    </div>
  );
}

export default Home;
