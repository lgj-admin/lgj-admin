import * as types from './mutation-types'

const matutaions = {
  [types.GET_CURRENTMENU](state, currentMenu) {
    state.currentMenu = currentMenu
  },
  [types.GET_NEWSCOUNT](state, newsCount) {
    state.newsCount = newsCount;
  },
  [types.MODIFY_NEWSCOUNT](state, newsCount) {
    if (!newsCount)return;
    newsCount--;
    state.newsCount = newsCount;
  },
  [types.GET_CODELIST](state, codeList) {
    state.codeList = codeList;
  },
  [types.GET_ADMININFO](state, adminInfo) {
    state.adminInfo = adminInfo;
  },
}

export default matutaions
