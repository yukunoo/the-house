import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ZB0LjHMbZlbFBIEyazxg63gLCx46BoPzkOK3lm3PAdxOfWfP78ejlwXxIvtE',
};
const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';

export default new Vuex.Store({
  state: {
    isLoading: false,
    rooms: [],
    singleRoom: {},
    roomInfo: {
    },
    imgUrl: '',
    descriptionShort: {
      Bed: [],
    },
    checkInAndOut: {},
    amenities: {},
    getTargetBg: [],
    reservation: {
      roomId: '',
      roomName: '',
      name: '',
      phone: '',
      date: [],
    },
  },
  actions: {
    getRoom(context) {
      context.commit('LOADING', true);
      axios.get(api, { headers })
        .then((res) => {
          if (res.data.success) {
            context.commit('ROOMS', res.data.items);
            context.commit('LOADING', false);
          }
        });
    },
    getSingleRoom(context, id) {
      context.commit('LOADING', true);
      axios.get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, { headers })
        .then((res) => {
          if (res.data.success) {
            context.commit('SINGLEROOM', res.data);
            context.commit('ROOMINFO', res.data.room[0]);
            context.commit('DESCRIPTIONSHORT', res.data.room[0].descriptionShort);
            context.commit('CHECKINANDOUT', res.data.room[0].checkInAndOut);
            context.commit('AMENITIES', res.data.room[0].amenities);
            context.commit('IMGURL', res.data.room[0].imageUrl[0]);
          }
          context.commit('LOADING', false);
        });
    },
    setReservationDate(context, obj) {
      context.commit('LOADING', true);
      context.commit('SETRESERVATIONDATE', obj);
      context.commit('LOADING', false);
    },
    roomBooking(context, obj) {
      axios.request({
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${obj.roomId}`,
        method: 'post',
        headers,
        data: {
          name: obj.name,
          tel: obj.phone,
          date: obj.date,
        },
      })
        .then((res) => {
          if (res.data.success) {
            context.commit('SETRESERVATIONDATE', obj);
          }
          context.dispatch('getSingleRoom', obj.roomId);
        }).catch((error) => {
          if (error.res) {
            console.log(error.response.data.message);
          }
        });
    },
  },
  mutations: {
    ROOMS(state, payload) {
      state.rooms = payload;
    },
    SINGLEROOM(state, payload) {
      state.singleRoom = payload;
    },
    ROOMINFO(state, payload) {
      state.roomInfo = payload;
    },
    DESCRIPTIONSHORT(state, payload) {
      state.descriptionShort = payload;
    },
    CHECKINANDOUT(state, payload) {
      state.checkInAndOut = payload;
    },
    AMENITIES(state, payload) {
      state.amenities = payload;
    },
    IMGURL(state, payload) {
      state.imgUrl = payload;
    },
    SETRESERVATIONDATE(state, payload) {
      if (payload.roomId) state.reservation.roomId = payload.roomId;
      if (payload.roomName) state.reservation.roomName = payload.roomName;
      if (payload.name) state.reservation.name = payload.name;
      if (payload.phone) state.reservation.phone = payload.phone;
      if (payload.date) state.reservation.date = payload.date;
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
});
