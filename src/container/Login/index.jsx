import React, { useCallback, useState, useRef} from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import Captcha from "react-captcha-code"
import s from './style.module.less'
import { post } from '@/utils/index.js'
import cx from 'classnames'

const Login = () => {
  const captchaRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值

  const handleCaptchaChange = useCallback((captcha) => {
    setCaptcha(captcha)
  }, [])

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      // 判断是否是登录状态
      if (type == 'login') {
        // 执行登录接口，获取 token
        const { data } = await post('/api/user/login', {
          username,
          password
        });
        // 将 token 写入 localStorage
        localStorage.setItem('token', data.token);
      } else {
        if (!verify) {
          Toast.show('请输入验证码')
          return
        };
        if (verify != captcha) {
          Toast.show('验证码错误')
          return
        };
        const { data } = await post('/api/user/register', {
          username,
          password
        });
        Toast.show('注册成功');
        // 注册成功，自动将 tab 切换到 login 状态
        setType('login');
      }
    } catch (error) {
      Toast.show('系统错误');
    }
  };

  const [type, setType] = useState('login'); // 登录注册类型

  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.active]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.active]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type === 'register' ? <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value) => setVerify(value)}
          />
          <Captcha ref={captchaRef} charNum={4} onChange={handleCaptchaChange} />
        </Cell> : null
      }
    </div>
    <div className={s.operation}>
      {
        type == 'register' ? <div className={s.agree}>
          <Checkbox />
          <label className="text-light">阅读并同意<a>《imoney条款》</a></label>
        </div> : null
      }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login