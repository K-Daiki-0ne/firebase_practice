import React from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

export const Feed: React.FC = (): JSX.Element => {

  return (
    <div>
      Feed
      <button
        onClick={async () => await signOut(auth).catch((err) => console.error(err))}
      >
        logout
      </button>
    </div>
    
  )
}
