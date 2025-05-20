import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/auth/check', { 
          withCredentials: true 
        });
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    return { user, loading, checkAuth };
  };