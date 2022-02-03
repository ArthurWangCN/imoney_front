import Home from '@/container/Home/index.jsx'
import Data from '@/container/Data/index.jsx'
import User from '@/container/User/index.jsx'
import Login from '@/container/Login/index.jsx'

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
  }
];

export default routes