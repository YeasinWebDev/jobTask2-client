import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import axios from 'axios';
import { auth } from './firebaseConfig';
import useAxiosCommon from '../Hooks/useAxiosCommon';

export const AuthContext = createContext(null);

function ContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosCommon = useAxiosCommon()

    
    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const logInByGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const signIn = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    const getToken = async (email) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true });
            return response.data; // Assuming the token is in the response data
        } catch (error) {
            console.error("Error fetching token:", error);
            return null;
        }
    };

    const saveUser = async user => {
        const currentuser = {
            email: user?.email,
            name: user?.name || user?.displayName,
            pin: user?.pin
        };

        const { data } = await axiosCommon.put(`/user`, currentuser);
        return data;
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                setUser(currentUser);
                await getToken(currentUser.email);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);


    const authInfo = { user, setUser, createUser, signIn, logOut, loading, setLoading, logInByGoogle, saveUser };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default ContextProvider;
