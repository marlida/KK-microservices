"use client";

import PageTitle from "@/components/Common/PageTitle";
import FilePage from "@/components/files/FilePage";
import React from "react";

function Files() {
    return (
        <div>
            <PageTitle title="หน้าสร้างข้อมูล"/>
            <FilePage />
        </div>
    );
}

export default Files;
