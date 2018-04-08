import * as types from './mutation-types'

const matutaions = {
  [types.GET_CURRENTMENU](state, currentMenu) {
    state.currentMenu = currentMenu
  },

}

export default matutaions
