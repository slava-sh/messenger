import alt from 'app/alt';
import MessageActions from 'app/actions/MessageActions';

export default alt.createStore(class MessageStore {

  constructor() {
    this.messages = [];

    this.bindListeners({
      onReceiveMessages: MessageActions.RECEIVE_MESSAGES,
    });
  }

  static getMessages(conversationId) {
    return this.getState().messages;
  }

  onReceiveMessages({ conversationId, messages }) {
    this.messages = messages;
  }
});
