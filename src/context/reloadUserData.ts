import { createContext } from "react";

const reloadUserDataContext = createContext<() => Promise<void>>(() => Promise.resolve());

export default reloadUserDataContext;
