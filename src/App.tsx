import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";

export function App(): ReactNode {
    return <>
        <TopBar />
        <Routes>
            <Route path="/" element={<div>123</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>;
}

export default function AppWrap(): ReactNode {
    return <App />;
}
