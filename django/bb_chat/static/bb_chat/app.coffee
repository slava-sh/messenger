class Conversation extends Backbone.Model
  urlRoot: '/bb/conversations'

  getViewUrl: ->
    '/bb/c/' + @get('id') + '/'

class Conversations extends Backbone.Collection
  model: Conversation
  url: '/bb/conversations'

class ConversationView extends Backbone.View
  tagName: 'div'
  className: 'conversation'
  template: _.template $('#conversation-view').html()

  render: ->
    @$el.html @template()
    this

class ConversationsView extends Backbone.View
  # tagName: 'div'
  # className: 'conversations'
  el: '.navigation'
  template: _.template $('#navigation-view').html()

  initialize: ->
    @collection = new Conversations()
    @collection.bind 'update', @render
    @collection.fetch()
    return

  render: =>
    @$el.html @template
      conversations: @collection
    this

class MessagesView extends Backbone.View
  tagName: 'div'
  className: 'messages'
  template: _.template $('#messages-view').html()

  initialize: ->
    @model.bind 'update', @render
    @render()
    return

  render: =>
    @$el.html @template
      conversation: @model
    console.log @$el.html()
    this

class Router extends Backbone.Router
  routes:
    'c/:id/': 'conversation'

  initialize: ->
    $(document).on 'click', 'a[href]', (e) ->
      href = this.getAttribute 'href'
      root = Backbone.history.root
      if href.startsWith root
        e.preventDefault()
        Backbone.history.navigate href.substr(root.length), trigger: true
      return
    return

  conversation: (id) ->
    conversation = new Conversation id: id
    window.conversation = conversation
    conversation.fetch()
    view = new MessagesView model: conversation
    $('.main').html view.$el
    return

$ ->
  conversationsView = new ConversationsView()
  router = new Router()
  Backbone.history.start
    pushState: true
    root: '/bb/'
  window.router = router
  window.conversationsView = conversationsView
  return
