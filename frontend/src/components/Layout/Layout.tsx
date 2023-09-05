import React, { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { SLayout, SMain } from "./styles";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SLayout>
            <Sidebar />
            <SMain>{children}</SMain>
        </SLayout>
    );
};

export default Layout;
