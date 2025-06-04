import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Food } from "./schemas/food";
import { User } from "./schemas/user";

import getFoodList from "./api/food/getFoodList";

import getUserData from "./api/user/getUserData";
import reloadUserDataContext from "./context/reloadUserData";
import userDataContext from "./context/userData";

import FunctionBar from "./components/FunctionBar";
import Loading from "./components/Loading";
import TopBar from "./components/TopBar";

import AddNew from "./views/AddNew";
import Home from "./views/Home";
import Search from "./views/Search";
import Detail from "./views/Detail";
import Order from "./views/Order";

export function App(): ReactNode {
    const [data, setData] = useState<Array<Food>>([]);

    useEffect(() => {
        getFoodList().then(setData);
    }, []);

    return <Routes>
        <Route path="/home" element={<Home data={data} />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/order" element={<Order />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
}

export default function AppWrap(): ReactNode {
    const [userData, setUserData] = useState<User | null>();

    const reloadUserData = useCallback(() => {
        return getUserData().then(setUserData).catch(() => setUserData(null));
    }, []);

    useEffect(() => {
        reloadUserData();
    }, [reloadUserData]);

    return <>
        <TopBar />
        <Loading show={userData === undefined} />
        {userData !== undefined &&
            <reloadUserDataContext.Provider value={reloadUserData}>
                <userDataContext.Provider value={userData}>
                    <App />
                </userDataContext.Provider >
            </reloadUserDataContext.Provider>
        }
        <FunctionBar />
    </>
}
