var Conversation = Backbone.Model.extend({
  getAbsoluteUrl: function() {
    return '/bb/c/' + this.get('id') + '/';
  }
});

var Conversations = Backbone.Collection.extend({
  model: Conversation,
  url: '/bb/conversations',
});

var ConversationView = Backbone.View.extend({
  tagName: 'div',
  className: 'conversation',
  template: _.template($('#conversation-view').html()),
  render: function() {
    this.$el.html(this.template());
    return this;
  },
});

var ConversationsView = Backbone.View.extend({
  // tagName: 'div',
  // className: 'conversations',
  el: '.navigation',
  template: _.template($('#navigation-view').html()),
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection = new Conversations();
    this.collection.bind('update', this.render);
    this.collection.fetch();
  },
  render: function() {
    this.$el.html(this.template({conversations: this.collection}));
    return this;
  },
});

var MessagesView = Backbone.View.extend({
  tagName: 'div',
  className: 'messages',
  template: _.template($('#messages-view').html()),
  render: function() {
    this.$el.html(this.template({conversation: this.conversation}));
    return this;
  },
});

var Router = Backbone.Router.extend({
  routes: {
    'c/:id/': 'conversation',
  },
  initialize: function() {
    $(document).on('click', 'a[href]', function(e) {
      var href = this.getAttribute('href');
      var root = Backbone.history.root;
      if (href.startsWith(root)) {
        e.preventDefault();
        console.log(href.substr(root.length));
        Backbone.history.navigate(href.substr(root.length), true);
      }
    });
  },
  conversation: function() {
    console.log(arguments);
  },
});

$(function() {
  var conversationsView = new ConversationsView();
  var router = new Router();
  Backbone.history.start({pushState: true, root: '/bb/'});
  window.router = router;
  window.conversationsView = conversationsView;
});
