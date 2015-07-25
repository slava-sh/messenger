class Conversation extends Backbone.Model
  urlRoot: '/bb/conversations'

  getViewUrl: ->
    '/bb/c/' + @get('id') + '/'

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

class ChatView extends Backbone.View
  className: 'chat'
  template: _.template $('#chat-view').html()

  initialize: ->
    @model = new Conversation id: @id
    @listenTo @model, 'change', @render
    @model.fetch()
    return

  render: =>
    @$el.html @template
      conversation: @model
    @$el.scrollTop @$el.prop 'scrollHeight'
    this

class NavigationView extends Backbone.View
  el: '.navigation'
  template: _.template $('#navigation-view').html()

  initialize: ->
    @conversationListView = new ConversationListView()
    return

  render: =>
    @$el.html @template()
    @conversationListView.$el = @.$('.conversations')
    @conversationListView.render()
    this

class Router extends Backbone.Router
  routes:
    '':       'home'
    'c/:id/': 'conversation'

  initialize:->
    $(document).on 'click', 'a[href]', (e)->
      href = this.getAttribute 'href'
      root = Backbone.history.root
      if href.startsWith root
        e.preventDefault()
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
