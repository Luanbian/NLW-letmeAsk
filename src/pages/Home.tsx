import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home(){
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
                    <button className='create-room'>
                        <img src={googleIcon} alt="logo da Google"/>
                        Crie sua sala com o Google
                    </button>
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