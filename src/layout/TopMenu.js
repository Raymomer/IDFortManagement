import React, { useLayoutEffect } from 'react';
import { NavLink, Link, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { ReactSVG } from 'react-svg';
import { TopMenuStyle } from './style';

const TopMenu = () => {
  const { path } = useRouteMatch();

  useLayoutEffect(() => {
    const active = document.querySelector('.strikingDash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = event => {
    document.querySelectorAll('.parent').forEach(element => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };
  return (
    <TopMenuStyle>
      <div className="strikingDash-top-menu">
        <ul>
          <li>
            <Link to={`${path}/business`}>
              Home
            </Link>
          </li>

         
          <li className="has-subMenu">
            <Link to="#" className="parent">
              Apps
            </Link>
            <ul className="subMenu">
              <li className="has-subMenu-left">
                <Link to="#" className="parent">
                  <FeatherIcon icon="target" />
                  Project
                </Link>
                <ul className="subMenu">
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/project/view/list`}>
                      Profile List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/wizards/one`}>
                      Create Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/project/projectDetails/1`}>
                      Profile Details
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink onClick={addParentActive} to={`${path}/app/calendar/month`}>
                  <FeatherIcon icon="calendar" />
                  Calendar
                </NavLink>
              </li>
              <li className="has-subMenu-left">
                <Link to="#" className="parent">
                  <FeatherIcon icon="users" />
                  Users
                </Link>
                <ul className="subMenu">
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/users/add-user/info`}>
                      Upload
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/users/dataTable`}>
                      Users List
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink onClick={addParentActive} to={`${path}/app/note/all`}>
                  <FeatherIcon icon="file-text" />
                  Note
                </NavLink>
              </li>
              <li className="has-subMenu-left">
                <Link to="#" className="parent">
                  <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/repeat.svg')} />
                  Import Export
                </Link>
                <ul className="subMenu">
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/importExport/import`}>
                      Import
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/importExport/export`}>
                      Export
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              Pages
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink onClick={addParentActive} to={`${path}/settings`}>
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink onClick={addParentActive} to={`${path}/maintenance`}>
                  Maintenance
                </NavLink>
              </li>
              <li>
                <NavLink onClick={addParentActive} to={`${path}/404`}>
                  404
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
};

export default TopMenu;
