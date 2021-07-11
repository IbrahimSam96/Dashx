import { createContext, useState, useEffect, useContext } from 'react';
import {firebaseClient} from './FirebaseIntialization';
import { useRouter } from 'next/router';





 const FirebaseContext = createContext(null);

export const FirebaseTrackingProvider = ({ children }) => {
  const router = useRouter();
  const [tracking, setTracking] = useState(null);


  useEffect(() => {

    if (typeof window !== 'undefined'){
      firebaseClient.analytics()
    }
    setTracking(firebaseClient.analytics());

    const handleRouteChange = () => {
      if (!tracking) {
        return;
      }

      tracking.logEvent('page_view', {
        page_location: url,
        page_title: document?.title,
      });
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [tracking]);



  return (
    <FirebaseContext.Provider value={tracking}>
      {children}
    </FirebaseContext.Provider>

  );
};

export const UseFirebaseContext = () => {
    return useContext(FirebaseContext);
  };