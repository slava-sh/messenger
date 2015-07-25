class Message extends Backbone.Model

class Messages extends Backbone.Collection
  model: Message

class Conversation extends Backbone.Model
  urlRoot: '/bb/conversations'

  getViewUrl: ->
    '/bb/c/' + @get('id') + '/'

  parse: (response, options) ->
    response.messages = new Messages response.messages
    return response

class Conversations extends Backbone.Collection
  model: Conversation
  url: '/bb/conversations'

class ConversationItemView extends Backbone.View
  className: 'conversation'
  template: _.template $('#conversation-view').html()

  render: ->
    @$el.html @template()
    this

class ConversationListView extends Backbone.View
  template: _.template $('#conversation-list-view').html()

  initialize: ->
    @collection = new Conversations()
    @listenTo @collection, 'update', @render
    @collection.fetch()
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

class ChatView extends Backbone.View
  className: 'chat'
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
    @messageListView = new MessageListView collection: @model.get('messages')
    @messageListView.$el = @.$('.messages')
    @messageListView.render()
    @scrollToBottom()
    this

  scrollToBottom: ->
    @$el.scrollTop @$el.prop 'scrollHeight'

  sendMessage: (event) =>
    event.preventDefault()
    data = _.object(_.map($(event.target).serializeArray(), _.values))
    message = new Message text: data.text
    message.url = "/bb/conversations/#{@id}/messages"
    message.save {},
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'X-CSRFToken', data.csrfmiddlewaretoken
      success: =>
        @$el.find('textarea') .val ''
        @messageListView.collection.add message
        @scrollToBottom()

class NavigationView extends Backbone.View
  el: '.navigation'
  template: _.template $('#navigation-view').html()

  render: =>
    @$el.html @template()
    @conversationListView = new ConversationListView()
    @conversationListView.$el = @.$('.conversations')
    @conversationListView.render()
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
    return

  conversation: (id) ->
    chatView = new ChatView id: id
    $('.main').html(chatView.$el)
    window.chatView = chatView
    return

class App
  constructor: ->
    @router = new Router()
    @navigationView = new NavigationView()
    @navigationView.render()

(exports ? this).App = App
