// components/ClientAuthGuard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
    const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {

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
