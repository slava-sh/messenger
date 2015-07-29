$         = require('jquery')
AppRouter = require('./router')
{AppView} = require('./views')

$ ->
  router = new AppRouter()
  app    = new AppView(router: router)
  $('body').append(app.render().$el)
  router.start()
  return

$.ajaxSetup(beforeSend: (xhr) ->
  unless this.crossDomain
    xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'))
  return
)
