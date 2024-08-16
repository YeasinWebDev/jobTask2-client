import React, { useContext, useEffect, useState } from 'react'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import { TiDeleteOutline } from "react-icons/ti";
import Card from './Card'
import Loading from './Loading'
import { AuthContext } from '../Auth/ContextProvider';

function Menu() {
    const { user } = useContext(AuthContext)
    const [data, setData] = useState(null)
    const [input, setInput] = useState('')
    const [inputText, setinputText] = useState("")
    const [loading, setloading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('');
    const axiosCommon = useAxiosCommon()

    const categories = ["Pizza", "Salad", "Desserts", "Burgers", "Appetizers", "Drinks", "Tacos", "Pasta", "Sandwiches", "Wraps"];
    const brandNames = ["Bella Italia", "Fresh Greens", "Sweet Delights", "Grill Masters", "Tropical Blends"];

    console.log(user)


    const fetchData = async (page, filters = {}) => {
        setloading(true)
        const result = await axiosCommon.post('/menu', { ...filters, sortOption }, {
            params: { page, limit: 9 },
        })
        setloading(false)
        setData(result.data.items)
        setTotalPages(result.data.totalPages)
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])


    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    // handle search functionality
    const handleSearch = async (e) => {
        setCurrentPage(1);
        setloading(true);
        const result = await axiosCommon.post('/search', { name: input, sortOption }, {
            params: { page: 1, limit: 9 },
        });
        setloading(false);
        setData(result.data.items);
        setTotalPages(result.data.totalPages);
        setinputText(input);
        setSelectedBrand('')
        setSelectedCategory('')
        setMinPrice('')
        setMaxPrice('')
        setInput('');
    };

    const applyFilters = () => {
        setCurrentPage(1);
        fetchData(1, {
            category: selectedCategory,
            brandName: selectedBrand,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
        setinputText('')
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        setMinPrice('');
        setMaxPrice('');
        setinputText('')
        setSortOption('');
        setCurrentPage(1);
        fetchData(1);
    };
    if(!user){
        return <h1 className='font-semibold text-xl pt-20'>Please Sign In to Access <span className='text-orange-600 font-bold'>Menu</span></h1>
    }

    return (
        <div>
            <h1 className='font-semibold text-3xl py-10'>Our <span className='text-orange-600 font-bold'>Food</span></h1>
            <div className='py-6'>
                <div className='flex items-center justify-center gap-5'>
                    <input type="text" className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' onChange={e => setInput(e.target.value)} value={input} placeholder='Search Food Name' />
                    <button className='text-white bg-orange-600 px-3 py-2 rounded-lg hover:bg-orange-800 ' onClick={handleSearch}>Search</button>
                    {
                        inputText
                        &&
                        <h1 className='flex items-center justify-center gap-2 bg-orange-600 text-white px-3 py-2 rounded-xl'>
                            {inputText}
                            <span className='cursor-pointer' onClick={() => (
                                setinputText(''),
                                fetchData(1)
                            )}>
                                <TiDeleteOutline size={29} color='white' />
                            </span>
                        </h1>
                    }
                </div>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-5 py-5'>
                <select className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' onChange={e => setSelectedBrand(e.target.value)} value={selectedBrand}>
                    <option value="">Select Brand</option>
                    {brandNames.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <input type="number" className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' placeholder="Min Price" onChange={e => setMinPrice(e.target.value)} value={minPrice} />
                <input type="number" className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' placeholder="Max Price" onChange={e => setMaxPrice(e.target.value)} value={maxPrice} />

                <select className='border-2 border-orange-500 rounded-lg px-3 py-2 outline-none font-semibold text-lg' onChange={e => setSortOption(e.target.value)} value={sortOption}>
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateDesc">Date Added: Newest First</option>
                </select>

                <button className='text-white bg-orange-600 px-3 py-2 rounded-lg hover:bg-orange-800' onClick={applyFilters}>Apply Filters</button>
                <button className='text-white bg-gray-600 px-3 py-2 rounded-lg hover:bg-gray-800' onClick={clearFilters}>Clear Filters</button>
            </div>
            {
                loading ? (
                    <div className='flex justify-center items-center h-screen'>
                        <Loading />
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