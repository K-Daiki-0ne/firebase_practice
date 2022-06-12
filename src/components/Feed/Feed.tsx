import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import styles from './Feed.module.css';
import { TweetInput } from '../TweetInput/TweetInput';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import { Post } from '../Post/Post';

export const Feed: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState([
    {
      id: '',
      text: '',
      username: '',
      timestamp: null
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
        {posts[0]?.id && (
          <>
            {posts.map((post: any) => {
              <Post 
                key={post.id}
                postId={post.id}
                text={post.text}
                username={post.username}
                timestamp={post.timestamp}
              />
            })}
          </>
        )}
    </div>
  )
}
