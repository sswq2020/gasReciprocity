// import { message } from 'antd';
import { reducers } from '@/utils/utils';
// import services from '@/services';

const namespace = 'gasForm';
// const selectState = state => state[namespace];

export default {
  namespace,
  state: {
    oilList: [],
    imgList: [0, 1],
  },

  reducers,

  effects: {},
};
