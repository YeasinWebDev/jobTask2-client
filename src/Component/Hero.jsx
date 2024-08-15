import React from 'react'

function Hero() {
    return (
        <div className='flex items-center justify-center gap-2 flex-col lg:flex-row'>
            <div className='lg:pt-10'>
                <h1 className='text-2xl lg:text-5xl md:text-4xl font-semibold pb-5 tracking-tighter '>Dive into Delights Of Delectable <span className='text-orange-700'>Food</span></h1>
                <p className='text-[#4A4A4A] text-sm lg:text-xl font-semibold '>
                    Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
                </p>
                <button className='md:mt-10 mt-2 bg-orange-700 text-white px-4 py-2 rounded-2xl'>Order Now</button>
            </div>
            <div>
                <img className='md:w-[40%] lg:w-[70%] w-[60%]' src="/assets/banner.png" alt="" />
                <div className='flex items-center justify-center gap-6'>
                    <div className='flex items-center justify-center gap-4 bg-[#f2f2f2] w-fit p-2 rounded-xl'>
                        <img className='w-[30%]' src="/assets/dish1.png" alt="" />
                        <div>
                            <h1 className='text-[16px] font-semibold whitespace-nowrap'>Spicy noodles</h1>
                            <div className='flex items-center gap-2 py-2'>
                                <img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" />
                            </div>
                            <h1 className='font-semibold'><span className='text-red-600'>$</span>18.00</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-4 bg-[#f2f2f2] w-fit p-2 rounded-xl'>
                        <img className='w-[30%]' src="/assets/dish2.png" alt="" />
                        <div>
                            <h1 className='text-[16px] font-semibold whitespace-nowrap'>Vegetarian salad</h1>
                            <div className='flex items-center gap-2 py-2'>
                                <img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" /><img src="/assets/star.png" alt="" />
                            </div>
                            <h1 className='font-semibold'><span className='text-red-600'>$</span>18.00</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero