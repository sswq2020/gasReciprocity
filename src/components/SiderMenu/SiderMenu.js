import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';
import pathToRegexp from 'path-to-regexp';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import { urlToList } from '@/utils/utils';
// import Link from 'umi/link';
import SubMenu from './SubMenu';
import styles from './index.less';
import BaseMenu, { getMenuMatches } from './BaseMenu';
import SiderMenuForPc from './SiderMenuForPc';

const { Sider } = Layout;

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  // Get the currently selected menu
  getSelectedMenuKeys = pathname =>
    urlToList(pathname).map(itemPath => getMenuMatches(this.flatMenuKeys, itemPath).pop());

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { collapsed, onCollapse, isMobile } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    // console.log(openKeys);
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    // const { logo, collapsed, onCollapse, fixSiderbar, theme } = this.props;
    const {
      collapsed,
      menuData,
      onCollapse,
      fixSiderbar,
      theme,
      isMobile,
      location: { pathname },
    } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });

    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let hideSidebarIcon = false;
    menuData.forEach(item => {
      if (selectedKeys[0] === item.path) {
        if (
          item.children === undefined ||
          item.children.length === 0 ||
          item.hideChildrenInMenu === true
        ) {
          hideSidebarIcon = true;
        }
      }
    });

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="xl"
        onCollapse={onCollapse}
        collapsedWidth={60}
        width={260}
        theme="light"
        style={{
          marginTop: isMobile === true ? 0 : 64,
          backgroundColor: '#E9ECF0',
        }}
        className={siderClassName}
      >
        {/* <div className={styles.logo} id="logo">
          <Link to="/">
          <img src={logo} alt="logo" />
          <h1>管理系统</h1>
          </Link>
        </div> */}
        {isMobile === true ? (
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%', overflowX: 'hidden', height: '100vh' }}
            {...defaultProps}
          />
        ) : (
          <Fragment>
            {hideSidebarIcon === false && (
              <i
                className={`${styles.showMore} ${collapsed === true ? styles.showMoreCur : ''}`}
                onClick={this.toggle}
                style={collapsed === true ? { left: 60 } : { right: 0 }}
              />
            )}
            <div className={styles.menuCon}>
              <SubMenu
                handleOpenChange={this.handleOpenChange}
                onOpenChange={this.handleOpenChange}
                openKeys={openKeys}
                {...this.props}
              />
              <SiderMenuForPc {...this.props} />
            </div>
          </Fragment>
        )}
      </Sider>
    );
  }
}
