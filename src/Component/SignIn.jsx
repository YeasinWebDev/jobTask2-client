import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/ContextProvider';
import { FaGoogle } from "react-icons/fa6";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const { signIn, user, loading, logInByGoogle, saveUser } = useContext(AuthContext)
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, pin);
      toast.success("Sign In successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const googleSignIn = async () => {
    console.log('click')
  logInByGoogle()
    .then(e => {
      saveUser({ email: e.user?.email, name: e?.user?.displayName })
      navigate('/')
      toast.success('signUp succesfull')
    })
    .catch(e => toast.error(e.message))
}
useEffect(() => {
  if (user && !loading) {
    navigate('/');
  }
}, [user]);


return (
  <div>
    <h2 className="flex items-center justify-center text-4xl font-bold">Sign In</h2>
    <div className="flex items-center flex-col pt-10 ">
      <form onSubmit={handleSubmit} className="w-fit border-2 border-orange-200 p-10 rounded-xl ">
        <div className='w-fit p-3 rounded-xl mb-2 border-black'>
          <label htmlFor="emailOrMobile" className='font-semibold text-lg'>Email:</label>
          <input
            type="text"
            id="identifier"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border-2 ml-2 outline-none p-2 rounded-lg border-orange-200'
          />
        </div>
        <div className='w-fit p-3 rounded-xl mb-2 border-black'>
          <label htmlFor="pin" className='font-semibold text-lg'>Password:</label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className='border-2 ml-2 outline-none p-2 rounded-lg border-orange-200'
          />
        </div>
        <button type="submit" className='btn bg-[#EA580C] hover:bg-orange-800 text-white  px-4 py-2 font-semibold rounded-xl flex items-center justify-center w-full'>Sign In</button>

        <div onClick={() => googleSignIn()} className="flex items-center justify-center flex-col mt-5 bg-orange-600 w-full rounded-xl btn hover:bg-orange-800">
          <div className='flex items-center justify-center gap-5 cursor-pointer'>
            <div className='py-3'>
              <FaGoogle color='white' size={24} />
            </div>
          </div>
        </div>

        <h1 className='flex items-center justify-center pt-4 font-semibold'>Don't Have an Account <Link to={'/signup'} className='text-[#EA580C] font-semibold pl-4'>SignUp</Link></h1>
      </form>
    </div>
  </div>
);
};

export default SignIn;
