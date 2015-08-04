
export default class CurrentUserStore {

  constructor() {
    this.user = undefined;
  }

  static getUser() {
    return this.getState().user;
  }
};
