import React, { useContext  } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/ContextProvider';

function Nav() {
    const { user, logOut } = useContext(AuthContext);
    const handelLogOut = async () => {
        await logOut();
    }

    return (
        <div className='border-b-2 border-orange-400 mb-10'>
            <div className="flex justify-between py-2">
                <Link to={'/'} className="btn btn-ghost text-xl"><img className='w-20 md:w-28' src="/assets/logo.png" alt="" /></Link>
                <div className=' flex justify-end items-center'>
                    {user ?
                        <>
                            <button onClick={() => handelLogOut()} className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl'>Log Out</button>
                            <h1 className='font-semibold text-sm px-1'>{user?.displayName || user?.email
                            }</h1>
                        </>
                        : <Link to={'/signin'}><button className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl'>Sign In</button></Link>}
                </div>
            </div>
        </div>
    )
}
export default Nav;
