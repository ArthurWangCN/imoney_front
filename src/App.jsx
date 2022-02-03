import { useEffect, useState } from 'react'

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom'
import routes from './router/index.js'

import NavBar from '@/components/NavBar';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const needNav = ['/', '/data', '/user'];
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return (
    <>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <Switch>
          {
            routes.map(route => <Route key={route.path} path={route.path} exact>
              <route.component />
            </Route>)
          }
        </Switch>
      </ConfigProvider>
      <NavBar showNav={showNav}></NavBar>
    </>
  )
}

export default App
