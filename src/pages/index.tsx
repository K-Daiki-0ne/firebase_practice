import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../store/userSlice';
import { auth } from '../config/firebase';
import { Feed } from '../components/Feed/Feed';
import { Auth } from '../components/Auth/Auth';
import useStyle from '../styles/style';

const Home: NextPage = (): JSX.Element => {
  const user     = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyle();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    }
  }, [dispatch]);

  return (
    <>
    {
      user.uid ? (
        <div className={classes.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )
    }
    </>
  )
}

export default Home
