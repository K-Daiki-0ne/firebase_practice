import React, { useState } from 'react';
import styles from './TweetInput.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import { Button } from '@mui/material';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../config/firebase';

export const TweetInput: React.FC = (): JSX.Element => {
  const [tweetMsg, setTweetMsg] = useState<string>('');
  const user = useSelector(selectUser);
  
  const sendTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(tweetMsg) {
      try {
        await addDoc(collection(db, 'posts'), {
          text: tweetMsg,
          timestamp: serverTimestamp(),
          username: user.displayName
        });
      } catch(err) {
        console.error(err);
      }
    }

    setTweetMsg('');
  }

  return (
    <>
      <form onSubmit={sendTweet}>
        <div className={styles.tweet_form}>
          <input 
            className={styles.tweet_input}
            placeholder='What is happening?'
            type="text"
            autoFocus
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!tweetMsg}
            className={
              tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
            }
          >
            Tweet
          </Button>
        </div>
      </form>
    </>
  )
}
