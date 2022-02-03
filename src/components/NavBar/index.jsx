import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { useHistory, useLocation } from 'react-router-dom';
import s from './style.module.less';
import CustomIcon from '../CustomIcon';

const NavBar = ({ showNav }) => {
  const { pathname } = useLocation();
  const [activeBar, setActiveBar] = useState(pathname);

  const history = useHistory()

  const changeBar = (path) => {
    setActiveBar(path);
    history.push(path);
  }

  return (
    <TabBar
      visible={showNav}
      className={s}
      activeKey={activeBar}
      onChange={changeBar}
    >
      <TabBar.Item itemKey="/" title="账单" icon={<CustomIcon type="zhangdan" />}></TabBar.Item>
      <TabBar.Item itemKey="/data" title="统计" icon={<CustomIcon type="tongji" />}></TabBar.Item>
      <TabBar.Item itemKey="/user" title="我的" icon={<CustomIcon type="wode" />}></TabBar.Item>
    </TabBar>
  )
}

NavBar.propTypes = {
  showNav: PropTypes.bool
}

export default NavBar;