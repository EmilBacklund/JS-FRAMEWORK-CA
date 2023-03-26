import Router from './routes/Router';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Loader from './components/shared/Loader';
import { useSelector } from 'react-redux';

function App() {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      <Router />
      <Footer />
    </>
  );
}

export default App;
