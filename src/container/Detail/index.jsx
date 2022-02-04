import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import dayjs from 'dayjs';
import cx from 'classnames';
import { get, post, typeMap } from '@/utils';
import { Modal, Toast } from 'zarm';
import CommonHeader from '@/components/CommonHeader';
import CustomIcon from '@/components/CustomIcon';
import PopupAddBill from '@/components/PopupAddBill'

import s from './style.module.less';

const Detail = () => {
  const editRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const { id } = qs.parse(location.search);

  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetail();
  }, []);

  // 获取账单详情
  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail?id=${id}`);
    setDetail(data)
  }

  // 删除账单
  const deleteBill = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onOk: async () => {
        const { data } = await post('/api/bill/delete', { id })
        Toast.show('删除成功')
        history.goBack()
      },
    });
  }

  return <div className={s.detail}>
  <CommonHeader title='账单详情' />
  <div className={s.card}>
    <div className={s.type}>
      <span className={cx({ [s.expense]: detail.pay_type == 1, [s.income]: detail.pay_type == 2 })}>
        <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
      </span>
      <span>{ detail.type_name || '' }</span>
    </div>
    {
      detail.pay_type&&detail.pay_type == 1
        ? <div className={cx(s.amount, s.expense)}>-{ detail.amount }</div>
        : <div className={cx(s.amount, s.incom)}>+{ detail.amount }</div>
    }
    <div className={s.info}>
      <div className={s.time}>
        <span>记录时间</span>
        <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
      </div>
      <div className={s.remark}>
        <span>备注</span>
        <span>{ detail.remark || '-' }</span>
      </div>
    </div>
    <div className={s.operation}>
      <span onClick={deleteBill}><CustomIcon type='shanchu' />删除</span>
      <span onClick={() => editRef.current&&editRef.current.show()}><CustomIcon type='tianjia' />编辑</span>
    </div>
  </div>
  <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
</div>
}

export default Detail
