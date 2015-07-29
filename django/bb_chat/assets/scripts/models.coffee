Backbone = require('backbone')

class Message extends Backbone.Model

class Messages extends Backbone.Collection
  model: Message

class Conversation extends Backbone.Model
  urlRoot: '/bb/conversations'

  initialize: ->
    @messages = new Messages()
    return

  parse: (response, options) ->
    unless @messages?
      @messages = new Messages()
    @messages.add(response.messages, merge: true)
    delete response.messages
    response

  getViewUrl: ->
    '/bb/c/' + @get('id') + '/'

class Conversations extends Backbone.Collection
  model: Conversation
  url: '/bb/conversations'

module.exports = {
  Message
  Messages
  Conversation
  Conversations
}
