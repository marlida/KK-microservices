import { Card } from "@/components/ui/card";
import AdminSection from "@/components/AdminState/Section";
import React from "react";

const admin = () => {
    return (
        <div>
            <div>
                <Card>
                    <div className=" font-bold ">
                        Administrator:
                    </div>
                </Card>
            </div>
            
            <div className="p-6">
                <Card>
                <AdminSection />
                </Card>
            </div>

        </div>
    );
};
export default admin;
