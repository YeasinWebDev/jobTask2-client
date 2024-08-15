

function Card({ img, price, star, name, des, category, brandName, time }) {

    return (
        <div>
            <div className='bg-[#f2f2f2] w-fit px-10 py-5 rounded-2xl shadow-lg'>
                <div>
                    <img
                        className='w-48 h-48 md:w-60 md:h-60 rounded-xl pt-4 object-cover'
                        src={img}
                        alt="Product"
                    />
                    <div className='flex flex-col gap-2 pt-3'>
                        <h1 className='font-semibold text-xl'>{name}</h1>
                        <h1 className='font-semibold text-sm'>{des?.slice(0, 40)}</h1>

                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold"><span className="border-b-2 border-orange-800">Brand</span> <br /> <span className="text-orange-600  ">{brandName}</span></h1>
                            <h1 className="font-semibold"><span className="border-b-2 border-orange-800">category</span> <br /> <span className="text-orange-600  ">{category}</span></h1>
                        </div>

                        <div className='flex justify-between'>
                            <h1 className='font-semibold text-lg'><span className='text-red-600'>$</span> {price}</h1>
                            <h1 className='flex items-center gap-2 font-semibold'><img src="/assets/star.png" alt="" />{star}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
