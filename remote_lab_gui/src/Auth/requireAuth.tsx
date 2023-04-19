import React, { useEffect, useState } from 'react';
import Auth from '.';

const RequireAuth = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuth(!!token);
  }, []);

  return isAuth ? (
    <>{children}</>
  ) : (
    <Auth />
  );
};

export default RequireAuth;
