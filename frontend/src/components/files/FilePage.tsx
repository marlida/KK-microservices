"use client";

import React from "react";

import PageTitle from "../Common/PageTitle";
import { AdminForm } from "./components/Admin/AdminForm";

import { Card } from "../ui/card";
import { Button } from "../ui/button";

const sections = [
    { name: "แอดมิน", component: <AdminForm /> },
    { name: "ผู้ใช้", component: <div>ส่วนผู้ใช้</div> },
    { name: "หมวดหมู่", component: <div>ส่วนหมวดหมู่</div> },
    { name: "แบรนด์", component: <div>ส่วนแบรนด์</div> },
    { name: "สินค้า", component: <div>ส่วนสินค้า</div> },
    { name: "ใบงาน", component: <div>ส่วนใบงาน</div> },
];

function FilePage() {
    const [activeSection, setActiveSection] = React.useState("แอดมิน");

    return (
        <>
            <PageTitle title="File Management" />
            <div className="relative p-6">
                <div className="relative z-10 flex items-center gap-2">
                    {sections.map(section => (
                        <Button
                            key={section.name}
                            variant="none"
                            className={`relative rounded-none rounded-tl-sm rounded-tr-sm border px-7 pt-6 pb-4 ${
                                activeSection === section.name
                                    ? "z-20 border-b-0 bg-white"
                                    : "bg-gray-50"
                            }`}
                            onClick={() => {
                                console.log(
                                    `Switching to ${section.name} section`
                                );
                                setActiveSection(section.name);
                            }}>
                            {section.name}
                        </Button>
                    ))}
                </div>

                <Card className="relative z-0 -mt-px rounded-md rounded-tl-none shadow-xs">
                    {
                        sections.find(section => section.name === activeSection)
                            ?.component
                    }
                </Card>
            </div>
        </>
    );
}

export default FilePage;
