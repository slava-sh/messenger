Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    '':       'home'
    'c/:id/': 'conversation'

  execute: (callback, args, name) ->
    console.log "route #{name}(#{args})"
    super callback, args, name

  start: ->
    Backbone.history.start
      pushState: true
      root: '/bb/'

module.exports = Router
