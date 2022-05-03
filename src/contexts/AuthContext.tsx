import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

interface Iuser {
  id: string;
  name: string;
  avatar: string;
}
interface IauthContext {
  user: Iuser | undefined;
  signInWithGoogle: () => Promise<void>;
}
interface IpropsAuth{
    children: ReactNode;
}

export const AuthContext = createContext({} as IauthContext);

export function AuthContextProvider(props: IpropsAuth){
  const [user, setUser] = useState<Iuser>();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user

        if(!displayName ||  !photoURL){
          throw new Error('Missing information from Google account.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return() =>{
      unsubscribe();
    }
  }, [])

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

    return(
        <AuthContext.Provider value={user, signInWithGoogle}>
            {props.children}
        </AuthContext.Provider>
    );
}