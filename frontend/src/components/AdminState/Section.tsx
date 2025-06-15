"use client";

import React, { useState } from "react";
import MockTable from "@/components/Datableta/mockTable";
import { SubForm } from "@/components/SubForm/Form";
const AdminSection: React.FC = () => {
    const [currentSection, setCurrentSection] = useState<"section1" | "section2">("section1");

    return (
        <div className="relative min-h-screen w-full p-6">
            <div className="absolute top-6 left-6">
                <div className="flex space-x-2">
                    <button
                        className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                            currentSection === "section1"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setCurrentSection("section1")}
                    >
                        ผู้ใช้งาน
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                            currentSection === "section2"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setCurrentSection("section2")}
                    >
                        Section Two
                    </button>
                </div>
            </div>

            <div className="mt-20">
                <div className="mx-auto w-full max-w-[95%]">
                    <div className="w-full rounded-lg bg-white">
                        {currentSection === "section1" ? (
                            <MockTable />
                        ) : (
                            <SubForm />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSection;
