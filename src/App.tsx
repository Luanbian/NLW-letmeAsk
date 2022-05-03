import './styles/global.scss';
import Paths from './routes';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Paths/>
    </AuthContextProvider>
  );
}

export default App;
