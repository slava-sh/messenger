import alt from 'app/alt';

export default alt.createStore(class CurrentUserStore {

  constructor() {
    this.user = undefined;
  }

  static getUser() {
    return this.getState().user;
  }
});
