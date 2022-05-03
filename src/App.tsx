import './styles/global.scss';
import Paths from './routes';
import {createContext, useState} from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface Iuser {
  id: string;
  name: string;
  avatar: string;
}
interface IauthContext {
  user: Iuser | undefined;
  signInWithGoogle: () => Promise<void>;
}
export const AuthContext = createContext({} as IauthContext);

function App() {
  const [user, setUser] = useState<Iuser>();

  async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);

    if(result.user){
      const {displayName, photoURL, uid} = result.user

      if(!displayName ||  !photoURL){
        throw new Error('Missing information from Google account.');
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      <Paths/>
    </AuthContext.Provider>
  );
}

export default App;
