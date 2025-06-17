import { Edit, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function TeamCard() {
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    return (
        <div className="mx-auto  bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">

            <div className="px-6 py-4 flex justify-between border-b gap-2">

                <div className='flex gap-2'>
                    <Image src="https://admin.pixelstrap.net/riho/assets/images/social-app/timeline-3.png" alt="" height={10} width={10} className='h-15 w-15 rounded-full bg-gray-500'></Image>
                    <div className='mt-2'>
                        <h2 className="text-md font-bold">Team Phoenix</h2>
                        <p className="text-sm">Web Development Team</p>
                    </div>
                </div>


                <div>
                    <button className='flex gap-1 font-semibold'><Edit></Edit> Edit</button>
                </div>
            </div>

            <div className="my-4 flex justify-center gap-2  text-center text-sm  divide-x divide-gray-300">
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Completed</p>
                    <p className='font-semibold'>12</p>
                </div>
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Running</p>
                    <p className='font-semibold'>3</p>
                </div>
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Earnings</p>
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
                        ["Charlie Kim", "Danielle Ray", 'Edward Lee'].map(member => (<>
                            <div className="p-2  flex justify-between">
                                <p className="font-semibold ">{member}</p>
                                <p className="">Member</p>
                            </div>
                        </>))
                    }
                </div>


            </div>
            <div className="flex justify-center md:gap-3 py-3">
                <div
                    className={`group flex items-center transition-all gap-1 duration-1000bg-green-200 p-2 rounded-full `}
                    onClick={() => setShowPhone(!showPhone)}
                >
                    <Phone />
                    <p
                        className={`group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap text-xs md:text-base`}
                    >
                        0178524789
                    </p>
                </div>

                <div
                    className={`group flex items-center transition-all duration-1000  p-2 gap-1 rounded-full 
                        `}
                    onClick={() => setShowEmail(!showEmail)}
                >
                    <Mail />
                    <p
                        className={`group-hover:opacity-100  group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap text-xs md:text-base`}
                    >
                        taskflow@mail.com
                    </p>
                </div>
            </div>


        </div>
    );
}
