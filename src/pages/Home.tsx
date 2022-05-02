import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import {Link} from 'react-router-dom';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';

export function Home(){

    function handleCreateRoom(){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result)
        })
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="imagem de perguntas e respostas"/>
                <strong>Crie salas de Q&A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-container'>
                    <img src={logoImg} alt="logo"/>
                    <Link to={'/rooms/new'} className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="logo da Google"/>
                        Crie sua sala com o Google
                    </Link>
                    <div className='separator'> ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder='digite o código da sala'/>
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}