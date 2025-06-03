import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Food from "./schemas/food";

import TopBar from "./components/TopBar";
import FunctionBar from "./components/FunctionBar";

import AddNew from "./views/AddNew";
import Home from "./views/Home";
import Search from "./views/Search";
import Detail from "./views/Detail";

import getData from "./api/getData";

export function App(): ReactNode {
    const [allLoaded, setAllLoaded] = useState<boolean>(false);
    const [data, setData] = useState<Array<Food>>([]);

    const loadNext = useCallback(() => {
        if (allLoaded) return;

        getData({
            offset: data.length,
            limit: 10
        }).then(result => {
            if (result.length < 10) setAllLoaded(true);

            setData(v => [...v, ...result]);
        });
    }, [allLoaded, data]);

    useEffect(() => {
        if (data.length !== 0) return;

        loadNext();
    }, [loadNext, data]);

    return <>
        <TopBar />
        <Routes>
            <Route path="/home" element={<Home data={data} loadNext={loadNext} />} />
            <Route path="/add" element={<AddNew />} />
            <Route path="/search" element={<Search />} /> 
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <FunctionBar />
        {/* <a href="https://www.flaticon.com/free-icons/meat" title="meat icons">Meat icons created by Freepik - Flaticon</a> */}
    </>;
}

export default function AppWrap(): ReactNode {
    return <App />;
}
