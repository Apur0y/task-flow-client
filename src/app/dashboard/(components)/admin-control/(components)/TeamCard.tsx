import Image from 'next/image';
import React from 'react';

export default function TeamCard() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
    
 <div className="px-6 py-4 flex border-b gap-2">
    <Image src="" alt="" height={10} width={10} className='h-15 w-15 rounded-full bg-gray-500'></Image>
    <div className='mt-2'>
  <h2 className="text-xl font-bold">Team Phoenix</h2>
        <p className="text-sm">Web Development Team</p>
    </div>    
      </div>
   
        <div className="my-4 flex justify-center gap-2 md:gap-4 text-center text-sm  divide-x divide-gray-300">
  <div className="px-2 sm:px-4 py-3">
    <p className="font-bold md:text-lg">Completed</p>
    <p className='font-semibold'>12</p>
  </div>
  <div className="px-2 sm:px-4 py-3">
    <p className="font-bold md:text-lg">Running</p>
    <p className='font-semibold'>3</p>
  </div>
  <div className="px-2 sm:px-4 py-3">
    <p className="font-bold md:text-lg">Earnings</p>
    <p className='font-semibold'>$15,000</p>
  </div>
</div>


<div className='m-3 border rounded-lg'>
     <div className=" p-2 flex justify-between text-white bg-task-primary rounded-t-md">
          <p className=" font-semibold ">Alice Johnson</p>
          <p className=""> Leader</p>
        </div>

         <div className="p-2 bg-teal-100 flex justify-between">
          <p className="font-semibold ">Bob Smith</p>
          <p className="">Co-Leader</p>
        </div>

        <div>
            {
                ["Charlie Kim","Danielle Ray", 'Edward Lee'].map(member=>(<>
                  <div className="p-2  flex justify-between">
          <p className="font-semibold ">{member}</p>
          <p className="">Member</p>
        </div>
                </>))
            }
        </div>


</div>

    </div>
  );
}
