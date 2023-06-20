import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import { EventPayload, SocietyPayload } from "@/types";

export default createStore({
  state: {
    managingSociety: "",
    email: "ao921@ic.ac.uk",
    user_id: "",
    eventsToday: [] as EventPayload[],
    savedEvents: [] as EventPayload[],
    attendingEvents: [] as EventPayload[],
    societies: [] as SocietyPayload[],
    subscribedSocieties: [] as SocietyPayload[],
  },
  getters: {
    Email(state) {
      return state.email;
    },
    EventsToday(state) {
      return state.eventsToday;
    },
    AttendingEvents(state) {
      return state.attendingEvents;
    },
    SavedEvents(state) {
      return state.savedEvents;
    },
    UserId(state) {
      return state.user_id;
    },
    Societies(state) {
      return state.societies;
    },
    SubscribedSocieties(state) {
      return state.subscribedSocieties;
    },
    SubscribedIds(state) {
      return new Set(
        state.subscribedSocieties.map((society) => society.objectID)
      );
    },
    ManagingSociety(state) {
      return state.managingSociety;
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setEventsToday(state, events) {
      state.eventsToday = events;
    },
    setSavedEvents(state, events) {
      state.savedEvents = events;
    },
    setAttendingEvents(state, events) {
      state.attendingEvents = events;
    },
    setUserId(state, user_id) {
      console.log("setting user id");
      state.user_id = user_id;
    },
    setSocieties(state, societies) {
      state.societies = societies;
    },
    setSubscribedSocieties(state, societies) {
      state.subscribedSocieties = societies;
    },
    setManagingSociety(state, society) {
      state.managingSociety = society;
    },
  },
  actions: {
    async setEmail({ commit }, email) {
      commit("setEmail", email);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      };
      await fetch("/api/user", options)
        .then((response) => response.json())
        .then(({ user_id }) => commit("setUserId", user_id))
        .catch((err) => console.error(err));
    },
    async setEventsToday({ commit }) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      await fetch("/api/events", options)
        .then((response) => response.json())
        .then((response) => commit("setEventsToday", response))
        .catch((err) => console.error(err));
    },
    saveEvent({ commit, state }, event) {
      const savedEvents = [...state.savedEvents, event];
      commit("setSavedEvents", savedEvents);
    },
    removeEvent({ commit, state }, event) {
      const savedEvents = state.savedEvents.filter(
        (savedEvent) => savedEvent.event_id !== event.event_id
      );
      commit("setSavedEvents", savedEvents);
    },
    attendEvent({ commit, state }, event: EventPayload) {
      const attendingEvents = [...state.attendingEvents, event];
      return fetch("/api/attend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attending: true,
          event_id: event.event_id,
          email: state.email,
        }),
      })
        .then(() => commit("setAttendingEvents", attendingEvents))
        .catch((err) => console.error(err));
    },
    unattendEvent({ commit, state }, event: EventPayload) {
      const attendingEvents = state.attendingEvents.filter(
        (attendingEvent) => attendingEvent.event_id !== event.event_id
      );
      return fetch("/api/attend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attending: false,
          event_id: event.event_id,
          email: state.email,
        }),
      })
        .then(() => commit("setAttendingEvents", attendingEvents))
        .catch((err) => console.error(err));
    },
    async fetchSocieties({ commit }) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      await fetch("/api/society", options)
        .then((response) => response.json())
        .then((response) => commit("setSocieties", response))
        .catch((err) => console.error(err));
    },
    async fetchSubscriptions({ commit, state }) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      };

      await fetch("/api/subscriptions", options)
        .then((response) => response.json())
        .then((response) => commit("setSubscribedSocieties", response))
        .catch((err) => console.error(err));
    },
    manageSociety({ commit, state }, society) {
      commit("setManagingSociety", society);
    },
    async unSubscribe({ state, commit }, society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          society,
          subscribe: false,
        }),
      };

      await fetch("/api/subscriptions", options)
        .then((response) => response.json())
        .then((response) => commit("setSubscribedSocieties", response))
        .catch((err) => console.error(err));
    },
    async subscribe({ state, commit }, society: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          society,
          subscribe: true,
        }),
      };

      await fetch("/api/subscriptions", options)
        .then((response) => response.json())
        .then((response) => commit("setSubscribedSocieties", response))
        .catch((err) => console.error(err));
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
});
