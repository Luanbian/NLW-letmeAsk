import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

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

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)
    
    if(result.user) {
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  );
}