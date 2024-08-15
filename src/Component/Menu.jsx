import React, { useEffect, useState } from 'react'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import Card from './Card'
import Loading from './Loading'

function Menu() {
    const [data, setData] = useState(null)
    const [loading, setloading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosCommon = useAxiosCommon()

    const menuData = async (page) => {
        setloading(true)
        const result = await axiosCommon.post('/menu', null, {
            params: { page, limit: 9 },
        })
        setloading(false)
        setData(result.data.items)
        setTotalPages(result.data.totalPages)
    }

    useEffect(() => {
        menuData(currentPage)
    }, [currentPage])


    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div>
            <h1 className='font-semibold text-3xl py-10'>Our <span className='text-orange-600 font-bold'>Food</span></h1>
            {
                loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <Loading/>
                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-5 flex-wrap'>
                        {data && data.map((item) => (
                            <div key={item.id}>
                                <Card img={item?.productImage} name={item?.productName} star={item?.ratings} price={item?.price} des={item?.description} category={item?.category} brandName={item?.brandName} time={item?.creationDateTime} />
                            </div>
                        ))}
                    </div>
                )
            }
            <div className='flex justify-center my-6 items-center'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className='px-4 py-2 mx-1 bg-gray-200 rounded-xl'
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div className='flex justify-center items-center'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 rounded-xl ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className='px-4 py-2 mx-1 bg-gray-200 rounded-xl'
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Menu