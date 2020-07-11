import Home from "../components/page/Home/Home";
import User from "../components/page/User/User";
import Users from "../components/page/Users";
import E404 from "../components/page/E404/E404";


export default [
    {
        path: "/users",
        exact: true,
        page: Users
    },
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

