import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type questionsprops = {
    id: string,
    author:{
        name: string;
        avatar: string;
    },
    isHighLighted: boolean; 
    isAnswered: boolean; 
    content: string;
}

type FirebaseQuestions = Record<string, {
    content: string;
    author:{
        name: string;
        avatar: string;
    },
    isHighLighted: boolean; 
    isAnswered: boolean; 
}>

export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<questionsprops[]>([])
    const [title, setTitle]  = useState<String>('');

    useEffect(() => {
        const roomref = database.ref(`rooms/${roomId}`);
        roomref.on('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions:FirebaseQuestions = databaseRoom.questions ?? {}; 

            const parsedQuestions = Object.entries(firebaseQuestions || {}).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId])

    return{ questions, title}
}