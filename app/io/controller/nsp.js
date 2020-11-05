'use strict';

const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class NspController extends Controller {
  async test() {
    const { ctx, app } = this;
    // 前端传过来的参数
    const message = ctx.args[0];
    console.log(message);

    // 当前的socket连接
    const socket = ctx.socket;
    // 取得socket的id
    const id = socket.id;
    // 向这个socket发送消息
    socket.emit(id, '来自后端的消息');
  };

  // 直播间发送弹幕
  async comment() {
    const { ctx, app, service, helper } = this
    const nsp = app.io.of('/')
    // 接收参数
    const message = ctx.args[0] || {}

    // 当前连接
    const socket = ctx.socket
    const id = socket.id

    let { live_id, token, data } = message
    if (!data) {
      socket.emit(id, ctx.helper.parseMsg('error', '评论内容不能为空'))
      return
    }
    // 验证用户token
    let user = await this.checkToken(token)
    if (!user) {
      return
    }
    // 验证当前直播间是否存在或是否处于直播中
    let msg = await service.live.checkStatus(live_id)
    if (msg) {
      socket.emit(id, ctx.helper.parseMsg('error', msg))
      return
    }

    const room = 'live_' + live_id
    // 推送消息到直播间
    nsp.to(root).emit('comment', {
      user: {
        id: user.id,
        name: user.nickname || user.username,
        avatar: user.avatar,
      },
      id: ctx.randomString(10),
      content: data,
    })
    // 生成一条comment数据
    app.model.Comment.create({
      content: data,
      live_id,
      user_id: user.id,
    })
  }
}


module.exports = NspController;
