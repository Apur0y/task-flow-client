
'use client';

import { selectAuth } from '@/feature/auth/authSelectors';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
    const [checkedAuth, setCheckedAuth] = useState(false);
    const auth= useSelector(selectAuth);
    const token = auth?.accessToken;

  useEffect(() => {
    
    const route= window.location.pathname.includes('dashboard')

    if (route && !token) {

      router.push('/login');
    }else{
      setCheckedAuth(true)
    }
  }, []); 
    if (!checkedAuth) {
    return <div className='min-h-screen flex justify-center items-center'>
      Loading...
    </div>; 
  }


  return <>{children}</>;
}
