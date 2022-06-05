import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import styles from './Feed.module.css';
import { TweetInput } from '../TweetInput/TweetInput';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';


export const Feed: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState([
    {
      id: '',
      text: '',
      username: ''
    }
  ]);

  useEffect(() => {
    const unSub = async () => {
      const querySnapshot: any = await getDocs(collection(db, "users"));
      setPosts(
        querySnapshot.map((doc: any) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        }))
      );
      
      return () => {
        unSub();
      }
    }
  }, [])

  return (
    <div className={styles.feed}>
      Feed
      <TweetInput />
      <button
        onClick={async () => await signOut(auth).catch((err) => console.error(err))}
      >
        logout
      </button>
    </div>
    
  )
}
