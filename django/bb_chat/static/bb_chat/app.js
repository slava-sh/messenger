var Conversation = Backbone.Model.extend({
  urlRoot: '/bb/conversations',
  getViewUrl: function() {
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
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('update', this.render);
    this.render();
  },
  render: function() {
    this.$el.html(this.template({conversation: this.model}));
    console.log(this.$el.html());
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
        Backbone.history.navigate(href.substr(root.length), true);
      }
    });
  },
  conversation: function(id) {
    var conversation = new Conversation({id: id});
    window.c = conversation;
    conversation.fetch();
    var view = new MessagesView({model: conversation});
    $('.main').html(view.$el);
  },
});

$(function() {
  var conversationsView = new ConversationsView();
  var router = new Router();
  Backbone.history.start({pushState: true, root: '/bb/'});
  window.router = router;
  window.conversationsView = conversationsView;
});
