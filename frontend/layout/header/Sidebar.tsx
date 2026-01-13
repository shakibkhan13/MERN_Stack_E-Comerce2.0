"use client";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import HeaderLeftSideBar from "./HeaderLeftSideBar";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="md:hidden">
            <Button onClick={toggleSidebar}>
                <Menu />
            </Button>
            <HeaderLeftSideBar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    );
};

export default Sidebar;