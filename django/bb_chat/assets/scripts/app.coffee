{AppRouter, AppView} = require('./lib')

$ ->
  router = new AppRouter
  app    = new AppView router: router
  router.start()
  return
