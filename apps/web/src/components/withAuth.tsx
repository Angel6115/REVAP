// src/components/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType, FC } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  const Authenticated: FC<P> = (props) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      } else {
        setAuthorized(true);
      }
    }, [router]);

    if (!authorized) return null;
    return <WrappedComponent {...props} />;
  };

  return Authenticated;
};

export default withAuth;
