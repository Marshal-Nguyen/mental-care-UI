import React from "react";
const StatictisDoctor = () => {
    return (
        <div>
            <div className="  grid grid-cols-2 grid-rows-1 gap-4 min-h-screen mt-5 p-6">
                <div>
                    <div className=" h-full grid grid-cols-1 grid-rows-2 gap-4">
                        <div className="bg-gradient-to-r from-[#925FE2] to-[#DFCFF7] rounded-2xl">
                            <div className="h-full grid grid-cols-3 grid-rows-1 px-4">
                                <div className=" col-span-2">
                                    <div className="h-full grid grid-cols-1 grid-rows-5 gap-4">
                                        <div className="row-span-3">
                                            <h1 className="text-5xl font-medium p-3 text-[#250242]">
                                                DR.KIM
                                            </h1>
                                        </div>
                                        <div className=" row-span-2 row-start-4 flex w-full">
                                            <div className="bg-[#fff0] w-full p-2">
                                                <div className="bg-[#ffffffc4] h-full rounded-2xl">
                                                    <h1 className="text-xl px-3 pt-3 pb-1 font-serif">
                                                        New Patients
                                                    </h1>
                                                    <h1 className="text-4xl px-3 font-mono">46</h1>
                                                </div>
                                            </div>
                                            <div className="bg-[#fff0] w-full p-2">
                                                <div className="bg-[#ffffffc4] h-full rounded-2xl">
                                                    <h1 className="text-xl px-3 pt-3 pb-1 font-serif">
                                                        Old Patients
                                                    </h1>
                                                    <h1 className="text-4xl px-3 font-mono">62</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-start-3 ">
                                    <img
                                        src="/Doctor2.png"
                                        alt="doctor"
                                        className="h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border">4</div>
                    </div>
                </div>
                <div className="border">2</div>
            </div>
        </div>
    );
};

export default StatictisDoctor;
