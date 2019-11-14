import React, { PureComponent } from 'react';
// import { formatMessage } from 'umi/locale';
// import { Layout, message } from 'antd';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
// import router from 'umi/router';
import GlobalHeader from '@/components/GlobalHeader';
// import TopNavHeader from '@/components/TopNavHeader';
// import Authorized from '@/utils/Authorized';
import styles from './Header.less';

const { Header } = Layout;
import { imgHost } from '@/services/mock';
const imgUrl = `${imgHost[ENV]}/action/hletong/file/gasDownload?file_id=`;

@connect(({ user, global, setting }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  notices: global.notices,
  setting,
}))
class HeaderView extends PureComponent {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)';
  };

  // handleNoticeClear = type => {
  //   message.success(
  //     `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
  //       id: `component.globalHeader.${type}`,
  //     })}`
  //   );
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'global/clearNotices',
  //     payload: type,
  //   });
  // };

  handleMenuClick = ({ key }) => {
    debugger
    const { dispatch,currentUser } = this.props;
    const {gsQrCode} = currentUser
    switch (key) {
      case 'logout':
        dispatch({
          type: 'user/logout',
        });
        break;
        case 'download':
          if(gsQrCode){
            window.open(`${imgUrl}${gsQrCode}`);
          }
          break;
      default:
        break;
    }
  };

  // handleNoticeVisibleChange = visible => {
  //   if (visible) {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'global/fetchNotices',
  //     });
  //   }
  // };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    // const { isMobile, handleMenuCollapse, setting } = this.props;
    const { handleMenuCollapse, setting } = this.props;
    // const { navTheme, layout, fixedHeader } = setting;
    const { fixedHeader } = setting;
    const { visible } = this.state;
    // const isTop = layout === 'topmenu';
    // const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      // <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
      <Header
        style={{ padding: 0, width: '100%' }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {/* {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            Authorized={Authorized}
            onCollapse={handleMenuCollapse}
            // onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            // onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : ( */}
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          // onNoticeClear={this.handleNoticeClear}
          onMenuClick={this.handleMenuClick}
          // onNoticeVisibleChange={this.handleNoticeVisibleChange}
          {...this.props}
        />
        {/* )} */}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default HeaderView;
