import React from 'react';
import styles from './TweetInput.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

export const TweetInput = () => {
  const user = useSelector(selectUser);
  
  return (

    <div>TweetInput</div>
  )
}
