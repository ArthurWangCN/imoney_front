import Home from '@/container/Home/index.jsx'
import Data from '@/container/Data/index.jsx'
import User from '@/container/User/index.jsx'
import Login from '@/container/Login/index.jsx'
import Detail from '@/container/Detail/index.jsx'
import UserInfo from '@/container/UserInfo/index.jsx'
import Account from '@/container/Account/index.jsx'
import About from '@/container/About/index.jsx'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/account",
    component: Account
  },
  {
    path: "/about",
    component: About
  },
];

export default routes