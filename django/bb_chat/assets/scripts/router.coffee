Backbone = require 'backbone'

class Router extends Backbone.Router
  routes:
    '':       'home'
    'c/:id/': 'conversation'

  execute: (callback, args, name) ->
    if (not _.isEmpty args) and (_.isNull _.last args)
      args = _.dropRight args
    console.log "route #{name}(#{args})"
    super callback, args, name

  start: ->
    Backbone.history.start
      pushState: true
      root: '/bb/'

module.exports = Router
