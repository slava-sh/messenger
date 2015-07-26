class Message extends Backbone.Model

class Conversation extends Backbone.Model
  urlRoot: '/bb/conversations'

  parse: (response, options) ->
    if not @messages?
      @messages = new Messages
    @messages.add response.messages, merge: true
    delete response.messages
    return response

  getViewUrl: ->
    '/bb/c/' + @get('id') + '/'

class Messages extends Backbone.Collection
  model: Message

class Conversations extends Backbone.Collection
  model: Conversation
  url: '/bb/conversations'

class ConversationListView extends Backbone.View
  template: _.template $('#conversation-list-view').html()

  initialize: ->
    @listenTo @collection, 'update', @render
    return

  render: =>
    @$el.html @template
      conversations: @collection
    this

class MessageItemView extends Backbone.View
  className: 'message'
  template: _.template $('#message-item-view').html()

  initialize: ->
    @listenTo @model, 'change', @render

  render: =>
    @$el.html @template
      message: @model
    this

class MessageListView extends Backbone.View
  className: 'messages'

  initialize: ->
    @listenTo @collection, 'add', @addMessage

  render: =>
    @collection.each @addMessage
    this

  addMessage: (message) =>
    messageView = new MessageItemView model: message
    @$el.append messageView.render().$el

  scrollToBottom: ->
    @$el.scrollTop @$el.prop 'scrollHeight'

class ChatView extends Backbone.View
  el: '.main'
  template: _.template $('#chat-view').html()
  events:
    'submit .new-message form': 'sendMessage'

  initialize: ->
    @model = new Conversation id: @id
    @listenTo @model, 'change', @render
    @model.fetch()
    return

  render: =>
    @$el.html @template
    @messageListView = new MessageListView collection: @model.messages
    @messageListView.$el = @.$('.messages')
    @messageListView.render()
    @messageListView.scrollToBottom()
    this

  sendMessage: (event) =>
    event.preventDefault()
    data = _.object _.map $(event.target).serializeArray(), _.values
    message = new Message text: data.text
    message.url = "/bb/conversations/#{@id}/messages"
    message.save null,
      beforeSend: (xhr) ->
        xhr.setRequestHeader 'X-CSRFToken', data.csrfmiddlewaretoken
      success: =>
        @$el.find('textarea') .val ''
        @messageListView.collection.add message
        @messageListView.scrollToBottom()

class NavigationView extends Backbone.View
  el: '.navigation'
  template: _.template $('#navigation-view').html()

  render: =>
    @$el.html @template()
    @conversationListView = new ConversationListView
      collection: new Conversations
    @conversationListView.collection.fetch()
    @conversationListView.$el = @.$('.conversations')
    this

class Router extends Backbone.Router
  routes:
    '':       'home'
    'c/:id/': 'conversation'

  initialize:->
    $(document).on 'click', 'a[href]', (event) ->
      href = this.getAttribute 'href'
      root = Backbone.history.root
      if href.startsWith root
        event.preventDefault()
        Backbone.history.navigate href.substr(root.length), trigger: true
      return
    Backbone.history.start
      pushState: true
      root: '/bb/'
    return

  execute: (callback, args, name) ->
    console.log "route #{name}(#{args})"
    super callback, args, name

  home: ->

  conversation: (id) ->
    chatView = new ChatView id: id
    window.chatView = chatView
    return

class App
  constructor: ->
    @router = new Router
    @navigationView = new NavigationView
    @navigationView.render()

(exports ? this).App = App
