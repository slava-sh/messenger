$         = require('jquery')
AppRouter = require('./router')
{AppView} = require('./views')

$ ->
  router = new AppRouter
  app    = new AppView router: router
  router.start()
  return
