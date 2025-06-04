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
import Detail from "./views/Detail";
import OrderPage from "./views/Order";
import getOrderList from "./api/order/getOrderList";
import { Order } from "./schemas/order";
import Profile from "./views/Profile";

export function App(): ReactNode {
    const [foodList, setFoodList] = useState<Array<Food>>();
    const [orderList, setOrderList] = useState<Array<Order>>();

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const reloadOrderList = useCallback(() => getOrderList().then(setOrderList), []);

    useEffect(() => {
        getFoodList().then(setFoodList);
        reloadOrderList();

        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, () => { }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000
        });
    }, [reloadOrderList]);

    return <Routes>
        <Route path="/home" element={<Home
            foodList={foodList}
            latitude={latitude}
            longitude={longitude}
        />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/detail/:id" element={<Detail
            foodList={foodList}
            reloadOrderList={reloadOrderList}
        />} />
        <Route path="/order" element={<OrderPage
            foodList={foodList}
            orderList={orderList}
            latitude={latitude}
            longitude={longitude}
        />} />
        <Route path="/profile" element={<Profile />} />
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
