import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function Home(){
    const {user, signInWithGoogle} = useContext(AuthContext);

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
        }    
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
                    <Link className='create-room' onClick={handleCreateRoom} to={'/rooms/new'}>
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