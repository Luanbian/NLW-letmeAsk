import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import {database} from '../services/firebase';

export function Home(){
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState<String>('');
    const navigate = useNavigate();

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle();
            return;
        }    
        navigate('/rooms/new');
    }

    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if(!roomRef.exists()){
            alert('Esta sala não existe.');
            return;
        }
        
        if(roomRef.val().endedAt){
            alert('Esta sala foi encerrada pelo administrador.');
            return
        }

        navigate(`rooms/${roomCode}`);
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
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="logo da Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'> ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder='digite o código da sala'
                        onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}