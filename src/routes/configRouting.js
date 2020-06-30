import Home from "../components/page/Home/Home";
import E404 from "../components/page/E404/E404";
import User from "../components/page/User/User";


export default [
    {
        path: "/:id",
        exact: true,
        page: User
    },
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: E404
    }
]