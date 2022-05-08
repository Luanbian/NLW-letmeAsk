import copyImg from '../assets/images/copy.svg';
import '../styles/roomcode.scss';

type RoomcodeProps = {
    code: string
}

export function RoomCode(props: RoomcodeProps){

    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>-N1_QdORDpjLZupNrw4L#1234567</span>
        </button>
    )
}