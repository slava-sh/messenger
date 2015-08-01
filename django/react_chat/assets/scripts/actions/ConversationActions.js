import alt from 'app/alt';
import { fetchApi } from 'app/utils';

export default alt.createActions(class ConversationActions {

  requestConversations() {
    this.dispatch();
    fetchApi('/react/conversations')
      .then((data) => this.actions.receiveConversations(data))
      .catch((error) => {
        console.log('request failed', error);
      });
  }

  receiveConversations(conversations) {
    this.dispatch(conversations);
  }

  requestConversation(id) {
    this.dispatch();
    fetchApi(`/react/conversations/${id}`)
      .then((data) => this.actions.receiveConversation(data));
  }

  receiveConversation(conversation) {
    this.dispatch(conversation);
  }
});
