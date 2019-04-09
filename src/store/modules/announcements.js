import axios from '@/api';

const state = {
  modalOpen: false,
  announcements: [],
  seenIDs: [],
  dismissedIDs: []
};
const getters = {
  allAnnouncements: state => state.announcements,
  pinnedAnnouncements: state =>
    state.announcements.filter(
      a => !state.dismissedIDs.includes(a._id) && a.isPinned
    )
};
const actions = {
  async GET_ANNOUNCEMENTS ({ commit }) {
    const response = await axios.get('/announcements');
    commit('SET_ANNOUNCEMENTS', response.data.announcements);

    if (localStorage.getItem('seenAnnouncementIDs')) {
      try {
        commit(
          'SET_SEEN_ANNOUNCEMENT_IDS',
          JSON.parse(localStorage.getItem('seenAnnouncementIDs'))
        );
      } catch (e) {
        localStorage.removeItem('seenAnnouncementIDs');
      }
    }
    if (localStorage.getItem('dismissedAnnouncementIDs')) {
      try {
        commit(
          'SET_DISMISSED_ANNOUNCEMENT_IDS',
          JSON.parse(localStorage.getItem('dismissedAnnouncementIDs'))
        );
      } catch (e) {
        localStorage.removeItem('dismissedAnnouncementIDs');
      }
    }
  }
};
const mutations = {
  SET_SEEN_ANNOUNCEMENT_IDS: (state, ids) => {
    state.seenIDs = ids;
  },
  SET_DISMISSED_ANNOUNCEMENT_IDS: (state, ids) => {
    state.dismissedIDs = ids;
  },
  SET_ANNOUNCEMENTS_MODEL_OPEN: (state, isOpen) => {
    state.modalOpen = isOpen;
  },
  SET_ANNOUNCEMENTS: (state, announcements) => {
    state.announcements = announcements;
  },
  ADD_ANNOUNCEMENT: (state, announcement) => {
    state.announcements.push(announcement);
    state.announcements = state.announcements.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};