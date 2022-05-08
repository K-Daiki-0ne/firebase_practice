import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../store/userSlice';
import { auth } from '../config/firebase';

const Home: NextPage = (): JSX.Element => {
  const user     = useSelector(selectUser);
  const dispatch = useDispatch();

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
    <div>Hello</div>
  )
}

export default Home
