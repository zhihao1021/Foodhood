import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Food from "./schemas/food";

import getFoodList from "./api/food/getFoodList";

import TopBar from "./components/TopBar";
import FunctionBar from "./components/FunctionBar";

import AddNew from "./views/AddNew";
import Home from "./views/Home";
import Search from "./views/Search";
import Detail from "./views/Detail";
import Order from "./views/Order";

import Loading from "./components/loading";
import reloadUserDataContext from "./context/reloadUserData";
import userDataContext from "./context/userData";
import getUserData from "./api/user/getUserData";
import { User } from "./schemas/user";

export function App(): ReactNode {
    const [allLoaded, setAllLoaded] = useState<boolean>(false);
    const [data, setData] = useState<Array<Food>>([]);

    const loadNext = useCallback(() => {
        if (allLoaded) return;

        getFoodList().then(result => {
            if (result.length < 10) setAllLoaded(true);

            setData(v => [...v, ...result]);
        });
    }, [allLoaded, data]);

    useEffect(() => {
        if (data.length !== 0) return;

        loadNext();
    }, [loadNext, data]);

    return <Routes>
        <Route path="/home" element={<Home data={data} loadNext={loadNext} />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/order" element={<Order />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    {/* <a href="https://www.flaticon.com/free-icons/meat" title="meat icons">Meat icons created by Freepik - Flaticon</a> */ }
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
