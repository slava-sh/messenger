Backbone = require 'backbone'
$        = require 'jquery'
_        = require 'lodash'
models   = require './models'

compileTemplate = (name) ->
  _.template require "templates/#{name}.html"

class ConversationListView extends Backbone.View
  template: compileTemplate 'conversation-list'

  initialize: ->
    @listenTo @collection, 'update', @render
    return

  render: =>
    @$el.html @template
      conversations: @collection
    this

class MessageItemView extends Backbone.View
  className: 'message'
  template: compileTemplate 'message-item'

  initialize: ->
    @listenTo @model, 'change', @render
    return

  render: =>
    @$el.html @template
      message: @model
    this

class MessageListView extends Backbone.View
  className: 'messages'

  initialize: ->
    @listenTo @collection, 'add', @addMessage
    return

  render: =>
    @collection.each @addMessage
    this

  addMessage: (message) =>
    messageView = new MessageItemView model: message
    @$el.append messageView.render().el
    this

  scrollToBottom: ->
    @$el.scrollTop @$el.prop 'scrollHeight'
    this

class ChatView extends Backbone.View
  template: compileTemplate 'chat'
  events:
    'submit .new-message form': 'sendMessage'

  initialize: ->
    @model = new models.Conversation id: @id
    @listenTo @model, 'change', @render
    @model.fetch()
    return

  render: =>
    @$el.html @template
    @messageListView = new MessageListView collection: @model.messages
      .setElement @.$('.messages')
      .render()
      .scrollToBottom()
    this

  sendMessage: (event) =>
    event.preventDefault()
    data = _.object _.map $(event.target).serializeArray(), _.values
    message = new models.Message text: data.text
    message.url = "/bb/conversations/#{@id}/messages"
    message.save null, success: =>
      @.$('textarea') .val ''
      @messageListView.collection.add message
      @messageListView.scrollToBottom()
    this

class NavigationView extends Backbone.View
  template: compileTemplate 'navigation'

  initialize: ->
    @conversationListView = new ConversationListView
      collection: new models.Conversations
    @conversationListView.collection.fetch()
    @render()
    return

  render: =>
    @$el.html @template()
    @conversationListView.setElement @.$('.conversations')
    this

class AppView extends Backbone.View
  template: compileTemplate 'app'

  initialize: (options) ->
    @mainView = null
    @navigationView = new NavigationView
    @render()
    @$el.on 'click', 'a[href]', (event) ->
      href = this.getAttribute 'href'
      root = Backbone.history.root
      if href.startsWith root
        event.preventDefault()
        Backbone.history.navigate href.substr(root.length), trigger: true
      return

    router = options.router
    @listenTo router, 'route:conversation', @showConversation
    return

  render: =>
    @$el.html @template()
    @mainView
      ?.setElement @.$('.main')
      .render()
    @navigationView
      .setElement @.$('.navigation')
      .render()
    this

  showConversation: (id) =>
    @mainView = new ChatView id: id
      .setElement @.$('.main')
    this

module.exports = {
  ConversationListView
  MessageItemView
  MessageListView
  ChatView
  NavigationView
  AppView
}
