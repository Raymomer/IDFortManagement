import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/performance`}>
              <FeatherIcon icon="home" />
            </NavLink>
          )
        }
        key="home"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/performance`}>
          Home
        </NavLink>
      </Menu.Item>

      {/* <SubMenu key="layout" icon={!topMenu && <FeatherIcon icon="layout" />} title="Layouts">
        <Menu.Item key="light">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeLight();
            }}
            to="#"
          >
            Light Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dark">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeDark();
            }}
            to="#"
          >
            Dark Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="topMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeTopNav();
            }}
            to="#"
          >
            Top Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sideMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeSideNav();
            }}
            to="#"
          >
            Side Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rtl">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onRtlChange();
            }}
            to="#"
          >
            RTL
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ltr">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onLtrChange();
            }}
            to="#"
          >
            LTR
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
      <SubMenu key="profile" icon={!topMenu && <FeatherIcon icon="target" />} title="Profile">
        <Menu.Item key="profileCreate">
          {/* <NavLink onClick={toggleCollapsed} to={`${path}/wizards/one`}>
            Create Profile
          </NavLink> */}
          <NavLink onClick={toggleCollapsed} to={`${path}/starter`}>
          Create Profile
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="views">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/view/list`}>
            Profile List
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="profileDetails">
          <NavLink onClick={toggleCollapsed} to={`${path}/project/projectDetails/1`}>
            Profile Details
          </NavLink>
        </Menu.Item> */}
      </SubMenu>

      <SubMenu key="users" icon={!topMenu && <FeatherIcon icon="users" />} title="Users">
        <Menu.Item key="addUser">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/add-user/info`}>
            Upload Document
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="userList">
          <NavLink onClick={toggleCollapsed} to={`${path}/users/dataTable`}>
            Users List
          </NavLink>
        </Menu.Item> */}
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/404`}>
              <FeatherIcon icon="info" />
            </NavLink>
          )
        }
        key="404"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/404`}>
          404
        </NavLink>
      </Menu.Item> */}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
