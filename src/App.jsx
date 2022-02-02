import { useState } from 'react'

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import routes from './router/index.js'

function App() {
  return (
    <Router>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <Switch>
          {
            routes.map(route => <Route key={route.path} path={route.path} exact>
              <route.component />
            </Route>)
          }
        </Switch>
      </ConfigProvider>
    </Router >
  )
}

export default App
