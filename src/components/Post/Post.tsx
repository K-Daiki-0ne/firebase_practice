import React, { useState, useEffect } from 'react';
import style from './Post.module.css';
import { db } from '../../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp, 
  query, 
  orderBy 
} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  postId: string;
  text: string;
  username: string;
  timestamp: any;
};

type Comments = {
  id: string;
  text: string;
  username: string;
  timestamp: any
}

export const Post: React.FC<Props> = (props): JSX.Element => {
  const user = useSelector(selectUser);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comments[]>([
    {
      id: '',
      text: '',
      username: '',
      timestamp: null
    }
  ]);

  useEffect(() => {
    const unSub = async () => {
      const orderCollection = collection(db, 'posts');
      const orderedTweet: any = query(orderCollection,  orderBy("timestamp", "desc"));
      setComments(
        orderedTweet.map((doc: any) => ({
          id: doc.id,
          text: doc.data().text,
          username: doc.data().username,
          timestamp: doc.data().timestamp
        }))
      )
    }

    unSub();

    return () => {
      unSub();
    }
  }, [props.postId]);

  const newComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        text: comment,
        timestamp: serverTimestamp(),
        username: user.displayName
      });
    } catch(err) {
      console.error(err);
    };

    setComment('');
  };

  return (
    <div className={style.post}>
      <div className={style.post_body}>
        <div>
          <div className={style.post_header}>
            <h3>
              <span className={style.post_headerUser}>@{props.username}</span>
              <span className={style.post_headerTime}>
                {new Date(props.timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className={style.post_tweet}>
            <p>{props.text}</p>
          </div>
        </div>
        <form onSubmit={newComment}>
          <div className={style.post_form}>
            <input
              className={style.post_input}
              type="text" 
              placeholder='new comment ...'
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setComment(e.target.value)
              }
            />
            <button
              className={
                comment ? style.post_button : style.post_buttonDisable
              }
              type='submit'
            >
              <SendIcon className={style.post_sendIcon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}