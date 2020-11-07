'use strict'

const Controller = require('egg').Controller

class SmsController extends Controller {
  //发送验证码
  async sendSms() {
    let { ctx, service } = this

    ctx.validate({
      phone: {
        type: 'string',
        required: true,
        desc: '手机号',
      },
    })

    const { phone } = ctx.request.body
    //调用service发送短信的方法，传入手机号
    console.log(phone)
    let res = await service.aliSms.sendCode(phone)
    console.log(res)
    if (res.sta === 1) {
      ctx.apiSuccess('ok')
    }
  }
}
module.exports = SmsController
