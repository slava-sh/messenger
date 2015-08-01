import alt from 'app/alt';
import { fetchApi } from 'app/utils';

export default alt.createActions(class MessageActions {

  requestMessages(conversationId) {
    this.dispatch();
    fetchApi(`/react/conversations/${conversationId}/messages`)
      .then((data) => this.actions.receiveMessages({
        conversationId,
        messages: data,
      }));
  }

  receiveMessages({ conversationId, messages }) {
    this.dispatch({ conversationId, messages });
  }
});
