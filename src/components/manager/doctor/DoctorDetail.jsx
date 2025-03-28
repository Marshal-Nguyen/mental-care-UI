import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DoctorScheduleViewer from "../../../components/Dashboard/Doctor/DoctorScheduleViewer";
import MedicalRecordsList from "../../../components/Dashboard/Doctor/MedicalRecordsList ";
import { useParams } from "react-router-dom";

const StatictisDoctor = () => {
    const [currentDate, setCurrentDate] = useState("");
    const { id } = useParams();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newPatientsCount, setNewPatientsCount] = useState(0);
    const [oldPatientsCount, setOldPatientsCount] = useState(0);

    useEffect(() => {
        const date = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        setCurrentDate(date.toLocaleDateString("en-US", options));
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchAllMedicalRecords = async () => {
            try {
                setLoading(true);
                // Fetch doctor profile
                const profileResponse = await axios.get(
                    `https://psychologysupport-profile.azurewebsites.net/doctors/${id}`
                );
                setName(profileResponse.data.doctorProfileDto.fullName);

                // Fetch total number of pages
                const initialResponse = await axios.get(
                    `https://psychologysupport-profile.azurewebsites.net/medical-records?PageIndex=1&PageSize=10&SortBy=CreatedAt&SortOrder=desc&DoctorId=${id}`
                );

                const totalPages = initialResponse.data.medicalRecords.totalPages;
                const totalCount = initialResponse.data.medicalRecords.totalCount;

                // Fetch all pages
                const allRecords = [];
                for (let page = 1; page <= totalPages; page++) {
                    const response = await axios.get(
                        `https://psychologysupport-profile.azurewebsites.net/medical-records?PageIndex=${page}&PageSize=10&SortBy=CreatedAt&SortOrder=desc&DoctorId=${id}`
                    );

                    allRecords.push(...response.data.medicalRecords.data);
                }

                // Count unique patients by status
                const processingPatientIds = new Set(
                    allRecords
                        .filter((record) => record.status === "Processing")
                        .map((record) => record.patientProfileId)
                );

                const donePatientIds = new Set(
                    allRecords
                        .filter((record) => record.status === "Done")
                        .map((record) => record.patientProfileId)
                );

                setNewPatientsCount(processingPatientIds.size);
                setOldPatientsCount(donePatientIds.size);
            } catch (err) {
                setError("Error fetching doctor data. Please try again.");
                console.error("Error fetching doctor data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMedicalRecords();
    }, [id]);

    return (
        <div className="h-full grid grid-cols-6 grid-rows-5 py-6 gap-4">
            <div className="col-span-4 relative flex row-span-2 h-full bg-gradient-to-br from-[#8047db] to-[#c2a6ee] rounded-2xl">
                <div className="w-[380px] py-6 pl-6">
                    <p className="text-sm text-white">{currentDate}</p>
                    <h2 className="text-2xl font-bold mt-2 text-white font-sans">
                        Welcome back, <br />{" "}
                        <span className="ml-23">{loading ? "..." : name || "Doctor"}</span>
                    </h2>
                    <p className="text-sm opacity-75 text-white italic">
                        Always stay updated in your student portal
                    </p>
                    <div className=" bottom-6 absolute flex w-[350px] h-[85px] gap-4 mt-12">
                        <div className="bg-[#ffffffb6] relative w-1/2 text-black p-3 rounded-lg shadow-md">
                            <p className="text-sm font-semibold">New Patients</p>
                            <p className="text-4xl font-serif">{newPatientsCount}</p>
                            <span className="text-green-600 absolute bottom-2 right-2 bg-[#d3fdd0] px-3 py-1 rounded-md text-[13px] font-mono">
                                51% &#x2197;
                            </span>
                        </div>
                        <div className="bg-[#ffffffb6] relative w-1/2 text-black p-3 rounded-lg shadow-md">
                            <p className="text-sm font-semibold">Old Patients</p>
                            <p className="text-4xl font-serif">{oldPatientsCount}</p>
                            <span className="text-red-600 absolute bottom-2 right-2 bg-red-200 px-3 py-1 rounded-md text-[13px] font-mono">
                                20% &#x2198;
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-fit">
                    <img src="/Doctor2.png" className="h-full pt-2 object-center" />
                </div>
                <div className="w-[254px] flex flex-col gap-3 my-auto mx-auto font-serif text-[13px] text-white text-center">
                    <p>
                        "Listen not only with your ears but also with your heart—because
                        sometimes, what a patient needs most is not advice, but
                        understanding"
                    </p>
                    <p>
                        "And remember, healing begins the moment someone feels truly heard"
                    </p>
                </div>
            </div>
            <div className=" col-span-2 row-span-5 col-start-5">
                <DoctorScheduleViewer doctorId={id} />
            </div>
            <div className=" col-span-4 row-span-3 row-start-3 text-red">
                <MedicalRecordsList profileId={id} />
            </div>
        </div>
    );
};

export default StatictisDoctor;
