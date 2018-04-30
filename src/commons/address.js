/**
 * Created by Admin on 2017/11/24.
 */
export function path() {
  let local = 'manage/'
  let server = 'http://localhost:8088/mobile/manage/'
  // server = local

  // todo 分页
  return {
    /**
     * 用户
     */
    'userInfo': server + 'user/get_user_info.do', // 获取用户信息
    'register': server + 'user/register.do', // 注册
    'login': server + 'user/login.do', // 登陆
    'logout': server + 'user/logout.do', // 退出登陆
    'uploadAvatar': server + 'user/upload.do', // 上传头像
    'updateAvatar': server + 'user/update_avatar.do', // 上传头像
    'updateUserInfo': server + 'user/update_user_info.do', // 修改个人信息
    'resetPassword': server + 'user/reset_password.do', // 修改密码
    'getQuestion': server + 'user/get_question.do', // 获取找回密码问题
    'checkAnswer': server + 'user/check_answer.do', // 验证答案
    'questionResetPassword': server + 'user/question_reset_password.do', // 通过问题修改密码
    /**
     * 分类
     */
    'categoryList': server + 'category/list.do', // 获取商品类别列表
    /**
     * 商品
     */
    'addGoods': server + 'goods/add.do', // 添加商品
    'updateProperties': server + 'goods/update_properties.do', // 添加/修改商品规格
    'imageUpload': server + 'goods/upload.do', // 上传图片
    'productionOn': server + 'goods/on_shelves.do', // 上架商品
    'productionOff': server + 'goods/off_shelves.do', // 下架商品
    'propertyDelete': server + 'goods/delete_property.do', // 删除商品规格
    'productionDelete': server + 'goods/delete.do', // 删除商品
    'productionList': server + 'goods/list.do', // 获取商品列表
    'productionDetail': server + 'goods/detail.do', // 获取商品详情
    'goodsDetail': server + 'goods/goods_detail.do', // 获取商品详情
    'updateGoodsDetail': server + 'goods/update_detail.do', // 获取商品详情
    'productionListByKeywords': server + 'goods/search.do', // 搜索商品
    'commentList': server + 'comment/list.do', // 评论列表
    'commentListLevel': server + 'comment/list_level.do', // 筛选评论
    'commentListImg': server + 'comment/list_img.do', // 筛选有图评论
    /**
     * 收货地址
     */
    'shippingList': server + 'shipping/list.do', // 获取用户的收货地址
    'deleteShipping': server + 'shipping/delete.do', // 删除收货地址
    'addShipping': server + 'shipping/add.do', // 删除收货地址
    'updateShipping': server + 'shipping/update.do', // 删除收货地址
    'region': server + 'shipping/region.do', // a
    /**
     * 订单
     */
    'orderSend': server + 'order/send.do', // 发货
    'orderList': server + 'order/list_by_seller.do', // 订单列表
    'orderListNotPay': server + 'order/list_not_pay.do', // 订单列表
    'orderListPayed': server + 'order/list_payed.do', // 订单列表
    'orderDetail': server + 'order/detail.do', // 订单详情
    'orderDetailByNo': server + 'order/detail_by_no.do' // 订单详情
  }
}
