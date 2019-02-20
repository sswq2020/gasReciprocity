import React, { PureComponent, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '@/utils/utils';
import styles from './index.less';

const { SubMenu } = Menu;
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

export default class BaseMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.getSelectedMenuKeys = memoizeOne(this.getSelectedMenuKeys, isEqual);
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
    this.state = {
      parMenuEnter: false,
    };
  }
  // static getDerivedStateFromProps(nextProps){
  //   console.log(nextProps === this.pr);
  // }
  // componentWillUpdate(nextProps) {
  //   const {
  //     collapsed,
  //     onCollapse,
  //     menuData,
  //     location: { pathname: nextPathname },
  //   } = nextProps;
  //   const {
  //     location: { pathname },
  //   } = this.props;
  //   const selectedKeys = this.getSelectedMenuKeys(nextPathname);

  //   menuData.forEach(item => {
  //     if (selectedKeys[0] === item.path) {
  //       if (
  //         item.children === undefined ||
  //         item.children.length === 0 ||
  //         item.hideChildrenInMenu === true
  //         ) {
  //           onCollapse(true);
  //         } else if (pathname !== nextPathname) {
  //           onCollapse(false);
  //         } else {
  //           onCollapse(collapsed);
  //         }
  //       }
  //     });
  //   }

  componentDidUpdate(prevProps) {
    const {
      collapsed,
      onCollapse,
      menuData,
      location: { pathname: nextPathname },
    } = this.props;

    const {
      location: { pathname },
    } = prevProps;
    const selectedKeys = this.getSelectedMenuKeys(nextPathname);

    menuData.forEach(item => {
      if (selectedKeys[0] === item.path) {
        if (
          item.children === undefined ||
          item.children.length === 0 ||
          item.hideChildrenInMenu === true
        ) {
          onCollapse(true);
        } else if (pathname !== nextPathname) {
          onCollapse(false);
        } else {
          onCollapse(collapsed);
        }
      }
    });
  }

  getParMenuItems = (menusData, selectedKey) => {
    // const { onCollapse, collapsed } = this.props;
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(
        item =>
          !(
            !item.name ||
            (!item.path &&
              (item.children === undefined ||
                item.children.length === 0 ||
                item.hideChildrenInMenu === true))
          )
      )
      .map(item => {
        const ItemDom = (
          <li
            className={`ant-menu-item ${selectedKey === item.path ? 'ant-menu-item-selected' : ''}`}
            key={item.path}
          >
            {this.getMenuItemPath(item)}
          </li>
        );
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  // getParMenuItems = (menusData, parent) => {

  // }

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item, parent);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname =>
    urlToList(pathname).map(itemPath => getMenuMatches(this.flatMenuKeys, itemPath).pop());

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      openKeys,
      // theme,
      // mode,
      menuData,
      location: { pathname },
    } = this.props;
    const { parMenuEnter } = this.state;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    // let props = {};
    // if (openKeys) {
    //   props = {
    //     openKeys,
    //   };
    // }
    // const { handleOpenChange, style, menuData } = this.props;
    return (
      // <Menu
      //   key="Menu"
      //   mode="vertical"
      //   theme="dark"
      //   // onOpenChange={handleOpenChange}
      //   selectedKeys={selectedKeys}
      //   // style={style}
      //   // className={styles.parMenu}
      // // {...props}
      // >
      <Fragment>
        <ul
          className={`ant-menu ant-menu-dark ant-menu-root ant-menu-vertical ${styles.parMenu} ${
            parMenuEnter === true ? '' : 'ant-menu-inline-collapsed'
          }`}
          onMouseEnter={() => {
            this.setState({
              parMenuEnter: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              parMenuEnter: false,
            });
          }}
        >
          {this.getParMenuItems(menuData, selectedKeys[0])}
        </ul>
      </Fragment>
      // {/* </Menu> */}
    );
  }
}
