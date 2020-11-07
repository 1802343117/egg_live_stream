'use strict'

const manager = require('./model/manager')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, io } = app

  //soket路由配置测试
  io.of('/').route('joinLive', io.controller.nsp.joinLive)
  io.of('/').route('leaveLive', io.controller.nsp.leaveLive)
  io.of('/').route('comment', io.controller.nsp.comment)
  io.of('/').route('gift', io.controller.nsp.gift)

  router.post('/api/reg', controller.api.user.reg) // 用户注册
  router.post('/api/login', controller.api.user.login) //用户登录
  router.post('/api/logout', controller.api.user.logout) //退出登录
  router.post('/api/sendSms', controller.api.sms.sendSms) // 发送验证码
  router.post('/api/phoneLogin', controller.api.user.phoneLogin) // 手机登录
  router.post('/api/wxLogin', controller.api.user.wxLogin) // 微信登录
  router.get('/api/user/info', controller.api.user.info) //获取当前用户信息
  router.post('/api/live/create', controller.api.live.save) //创建直播间
  router.post('/api/live/changestatus', controller.api.live.changeStatus) //修改直播间状态
  router.get('/api/live/list/:page', controller.api.live.list) //直播间列表
  router.get('/api/live/read/:id', controller.api.live.read) //查看指定直播
  router.get('/api/gift/list', controller.api.gift.list) //礼物列表

  router.get('/test', controller.admin.test.page)
  //新增管理员
  router.get('/admin/manager/create', controller.admin.mananger.create)
  router.post('/admin/manager', controller.admin.mananger.save)
  //管理员列表
  router.get('/admin/manager', controller.admin.mananger.index)
  //编辑管理员
  // router.get('/admin/manager/edit/:id', controller.admin.manager.edit)
  // router.post('/admin/manager/:id', controller.admin.manager.update)
  //删除管理员
   router.get('/admin/manager/delete/:id', controller.admin.mananger.delete)
}
