<template>
  <div class="header">
    <div class="content-wra">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- v-if 是“真正”的条件渲染,因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建 -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      
        </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="bulletin-wra" @click="showDetail"> 
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="backgroud">
      <img  width="100%" height="100%" :src="seller.avatar" alt="">
    </div>
    <!-- 过度实现进入/离开渐变特效。transition name="fade"  用css渲染-->
    <transition name="fade"> 
    <div v-show="detailShow" class="detail">
      <div class="detail-wra  clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wra">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
             <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家通告</div>
            <div class="line"></div>
          </div>
           <div class="bulletin">
             <p class="content">{{seller.bulletin}}</p>
           </div>
         </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="el-icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import star from '../../components/star/star'

Vue.use(ElementUI)

export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false // 新增 detailShow 注意 data 须是一个函数
      };
    },
    
    methods: {
      showDetail() { // 新增 showDetail 方法
        this.detailShow = true;
      },
      hideDetail() {
         this.detailShow = false;
      }
    },
    created(){
      this.classMap= ['decrease','discount','guarantee','invoice','special']
    },
    components: {
      star
    }
    
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
@import "../../common/stylus/mixni.styl";


 .header
   position: relative
   color: #fff
   background-color: rgba(7,17,27,0.2)
  .content-wra
     position: relative
     padding: 24px 12px 18px 24px
     font-size: 0
     .avatar
       display: inline-block
       vertical-align: top
       img 
        border-radius: 2px
     .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top 
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight:bold
      .description
        margin-bottom: 10px
        line-height 12px
        font-size  12px
      .support
        .icon 
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
             bg-image('discount_1')
          &.guarantee
             bg-image('guarantee_1')
          &.invoice
             bg-image('invoice_1')
          &.special
             bg-image('special_1')
        .text
          line-height: 12px
          font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom:18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: 10px
        .el-icon-arrow-right
           line-height: 12px
           font-size: 10px
  .bulletin-wra
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7,17,27,0.2)
      .bulletin-title
        margin-top: 7px
        display: inline-block
        vertical-align: top
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        margin: 0 4px
      .el-icon-arrow-right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
  .backgroud
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
  .detail
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: 100%
    height: 100%
    overflow: auto
    //<!-- 过度实现进入/离开渐变特效。 -->
    opacity: 1
    background: rgba(7, 17, 27, 0.8)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wra
      min-height: 100%
      width: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wra
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          width:80%
          margin: 28px auto 24px auto 
          display: flex
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255,255,255,0.2)
          .text 
            padding 0 12px
            font-weight: 700
            font-size: 14px
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              width: 16px
              height:16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                  bg-image('decrease_2')
              &.discount
                  bg-image('discount_2')
              &.guarantee
                  bg-image('guarantee_2')
              &.invoice
                  bg-image('invoice_2')
              &.special
                 bg-image('special_2')
            .text
              line-height: 12px
              font-size: 12px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      height: 32px
      width: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
</style>