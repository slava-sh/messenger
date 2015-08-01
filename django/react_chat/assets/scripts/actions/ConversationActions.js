import alt from 'app/alt';
import { fetchApi } from 'app/utils';

export default alt.createActions({
  requestConversations() {
    this.dispatch();
    fetchApi('/react/conversations')
      .then((data) => this.actions.receiveConversations(data))
      .catch((error) => {
        console.log('request failed', error);
      });
  },

  receiveConversations(conversations) {
    this.dispatch(conversations);
  },
});
