import React, { useEffect, useState } from "react";
import { Space, Button, Table, Modal, Input, Form, message } from "antd";
import { $getUsers, $modifyUser, $register } from '../../api/request'
export default function Users() {
  const dayjs = require('dayjs');
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([]);
  const [totalRows, setTotalRows] = useState(10);
  const [userModifyModalOpen, setUserModifyModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [targetData, setTargetData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageChange = async (page = current, pageSize = pageSize) => {
    console.log(page, pageSize);
    const { data } = await $getUsers(page, pageSize);
    setDataSource(data.data);
    setTotalRows(data.count);
  }
  const showUserModify = (param) => {
    setTargetData(param);
    setUserModifyModalOpen(true);
  }

  const handleUserModifyOk = async (param) => {
    const { data } = await $modifyUser(param);
    console.log(data, 'after modify===');
    pageChange(current, pageSize);
    setUserModifyModalOpen(false);
  }

  const handleUserModifyCancel = () => {
    setUserModifyModalOpen(false);
  }

  const showUserAdd = () => {
    setAddModalOpen(true);
  }

  const hiddenUserAdd = () => {
    setAddModalOpen(false);
  }

  const handleUserAddOk = async (values) => {
    const { name, nickName, password, email, re_password } = values;
    if (password !== re_password) {
      messageApi.open({ type: 'error', content: '2次密码输入不一致！' })
      return;
    }
    const { data, status, data: { msg } } = await $register(name, nickName, password, email);
    if (status === 200 && msg === 'success') {
      messageApi.open({ type: 'success', content: '新增用户成功' })
    } else {
      messageApi.open({ type: 'error', content: '新增用户失败' })
    }
    setAddModalOpen(false);
    pageChange();
  }

  const clipboardCopy = (value) => {
    navigator.clipboard.writeText(value);
    messageApi.open({
      type: 'info',
      content: '已复制',
    })
  }
  const columns = [
    {
      title: '用户名', dataIndex: 'name', key: 'name', render: (_, value) => (
        <span className="clipboard-copy" onClick={() => clipboardCopy(value.name)}>{value.name}</span>
      )
    },
    { title: '昵称', dataIndex: 'nickName', key: 'name' },
    {
      title: '邮箱', dataIndex: 'email', key: 'name', render: (_, value) => (
        <span className="clipboard-copy" onClick={() => clipboardCopy(value.email)}>{value.email}</span>
      )
    },
    {
      title: '密码', dataIndex: 'password', key: 'name', render: (_, value) => (
        <span className="clipboard-copy" onClick={() => clipboardCopy(value.password)}>{value.password}</span>
      )
    },
    {
      title: '创建日期', dataIndex: 'createdAt', key: 'name', render: (_, record) => (
        <span>
          {dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      )
    },
    {
      title: '更新日期', dataIndex: 'updatedAt', key: 'name', render: (_, record) => (
        <span>
          {dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      )
    },
    {
      title: '操作', dataIndex: 'actions', key: 'name', render: (_, record) => (
        <>
          <Button type='link' onClick={() => showUserModify(record)}>修改</Button>
          <Button type='link' onClick={() => { }}>删除</Button>
        </>
      )
    },
  ]
  useEffect(() => {
    pageChange(current, pageSize);
  }, [])
  return (
    <>
      {contextHolder}
      <div className="title">用户管理</div>
      <div className="operation">
        <Button type='primary' onClick={() => showUserAdd()}>新增用户</Button>
      </div>
      <div className="content">
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={(pagination) => { pageChange(pagination.current, pagination.pageSize) }}
          pagination={{
            total: totalRows,
            showSizeChanger: true,
            showTotal: (total) => `总计 ${total} 个`,
            current: current,
            pageSize: pageSize,
            onChange: (page, pageSize) => { setCurrent(page); setPageSize(pageSize) }
          }}
        />
      </div>
      <ModifyModal
        userModifyModalOpen={userModifyModalOpen}
        handleUserModifyOk={handleUserModifyOk}
        handleUserModifyCancel={handleUserModifyCancel}
        data={targetData}
      />
      <AddModal
        addModalOpen={addModalOpen}
        hiddenUserAdd={hiddenUserAdd}
        handleUserAddOk={handleUserAddOk}
      />
    </>
  )
}
/**
 * 修改用户信息
 */
function ModifyModal(props) {
  let { userModifyModalOpen, handleUserModifyOk, handleUserModifyCancel, data } = props;
  const [modalData, setModalData] = useState({});
  useEffect(() => {
    setModalData(data);
  }, [data])
  return (
    <>
      <Modal title='修改用户信息' open={userModifyModalOpen} onOk={() => handleUserModifyOk(modalData)} onCancel={handleUserModifyCancel}>
        <label><span style={{ color: 'red' }}>*</span>用户名</label>
        <Input readOnly value={modalData.name} />
        <label><span style={{ color: 'red' }}>*</span>密码</label>
        <Input value={modalData.password} onChange={(e) => setModalData({ ...modalData, password: e.target.value })} />
        <label>昵称</label>
        <Input value={modalData.nickName} onChange={(e) => setModalData({ ...modalData, nickName: e.target.value })} />
        <label>邮箱</label>
        <Input value={modalData.email} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} />
      </Modal>
    </>
  )
}

/**
 * 
 */
function AddModal(props) {
  let { addModalOpen, hiddenUserAdd, handleUserAddOk } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (addModalOpen === true) {
      form.setFieldsValue({
        name: '',
        nickName: '',
        password: '',
        re_password: '',
        email: '',
      })
    }
  }, [addModalOpen])
  return (
    <>
      <Modal title='新增用户信息' open={addModalOpen} onCancel={hiddenUserAdd} onOk={() => { form.validateFields().then((values) => handleUserAddOk(values)) }}>
        <Form labelCol={{ span: 4 }} form={form}>
          <Form.Item label='用户名' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='昵称' name='nickName'>
            <Input />
          </Form.Item>
          <Form.Item label='密码' name='password'
            rules={[
              { required: true }
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item label='确认密码' name='re_password' dependencies={['password']}
            rules={[
              {
                required: true,
                message: '请输入'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('2次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item label='邮箱' name='email'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}