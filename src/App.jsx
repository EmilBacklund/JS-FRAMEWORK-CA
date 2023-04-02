import Router from './routes/Router';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Loader from './components/shared/Loader';
import PageNotFound from './pages/PageNotFound';
import { useSelector } from 'react-redux';

function App() {
  const { isLoading } = useSelector((state) => state.loader);
  const { isError } = useSelector((state) => state.products);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {isError && <PageNotFound />}
      {!isError && <Router />}
      <Footer />
    </>
  );
}

export default App;
