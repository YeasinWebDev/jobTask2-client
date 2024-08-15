import React, { useEffect, useState } from 'react'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import Card from './Card'

function Menu() {
    const [data,setData] = useState(null)
    const axiosCommon = useAxiosCommon()
    const menuData = async () => {
        const result = await axiosCommon.post('/menu')
        setData(result.data)
    }

    useEffect(() =>{
        menuData()
    },[])
  return (
    <div>
        <h1 className='font-semibold text-3xl py-10'>Our <span className='text-orange-600 font-bold'>Food</span></h1>
        <div className='flex items-center justify-center gap-5 flex-wrap'>
            {data && data.map((item) => (
                <div key={item.id}>
                    <Card img={item?.productImage} name={item?.productName} star={item?.ratings} price={item?.price} des={item?.description} category={item?.category} brandName={item?.brandName} time={item?.creationDateTime}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Menu