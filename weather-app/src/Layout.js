import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PushpinOutlined,
  SendOutlined,
  SettingOutlined,
  SunOutlined,
} from '@ant-design/icons';
import Weather from '../src/Components/Weather'
import { Button, Layout, Menu, theme } from 'antd';
import Cities from './Components/Cities';
import { Map } from './Components/Map';
import { Settings } from './Components/Settings';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(e) => setSelectedMenuKey(e.key)}
          items={[
            {
              key: '1',
              icon: <SunOutlined />,
              label: 'Weather',
            },
            {
              key: '2',
              icon: <SendOutlined />,
              label: 'Cities',
            },
            {
              key: '3',
              icon: <PushpinOutlined />,
              label: 'Map',
            },
            {
              key: '4',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            flexGrow: 1,
          }}
        >
          {selectedMenuKey === '1' && <Weather />}  
          {selectedMenuKey === '2' && <Cities />}  
          {selectedMenuKey === '3' && <Map />} 
          {selectedMenuKey === '4' && <Settings />}   
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;