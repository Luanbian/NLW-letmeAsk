import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type questionsprops = {
    id: string,
    author:{
        name: string;
        avatar: string;
    },
    isHighLighted: boolean; 
    isAnswered: boolean; 
    content: string;
    likeCount: number;
    likedId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    content: string;
    author:{
        name: string;
        avatar: string;
    },
    isHighLighted: boolean; 
    isAnswered: boolean; 
    likes: Record<string,{authorId:string}>
}>

export function useRoom(roomId: string){
    const {user} = useAuth();
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
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likedId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

        return () => {
            roomref.off('value');
        }
    }, [roomId, user?.id])

    return{ questions, title}
}