import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSession() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth');
    if (!isLoggedIn) {
      navigate('/');
      return; 
  }

  }, [navigate])

}


// function useRedirectIfLoggedIn() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('auth');
//     if (isLoggedIn) {
//       navigate('/leads');
//       return; 
//   }

//   }, [navigate])

// }

export default useSession;


