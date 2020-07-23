<template>
  <div class="cartcontrol">
      <transition name="move"> 
      <div class="cart-decrease " v-show="food.count>0" @click="decreasecart" >
          <i class="inner el-icon-remove-outline"></i>
      </div>
      </transition> 
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add el-icon-circle-plus" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
    
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!event._constructed) {
                return 
            }
            console.log('click')
            if(!this.food.count){
                Vue.set(this.food,'count' , 1)
            }else{
                this.food.count++
            }
            this.$emit('cart-add',event.target);
        },
        
        decreasecart(event) {
            if (!event._constructed) {
                return 
            }
            console.log('click')
            if(this.food.count){
               
                this.food.count--
            }
             
         }
    }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
    .cartcontrol
        font-size : 0
        .cart-decrease,.cart-add
            display: inline-block
            padding : 6px
            opacity : 1
            transform : translate3d(0, 0, 0)
            transform : rotate(0)
            &.move-enter-active, &.move-leave-active
                transition : all 0.4s linear 
            .inner
                display :inline-block
                font-size: 24px
                color : rgb(0,160,220)
                line-height : 24px
                transform : rotate(0)
                transition : all 0.4s linear 
            &.move-enter, &.move-leave-to
                opacity : 0
                transform : translate3d(24px, 0 ,0)
                .inner
                    transform : rotate(180deg)
                    
        .cart-count
            display: inline-block
            vertical-align : top
            width : 12px
            padding-top : 6px
            line-height : 24px
            text-align : center
            font-size : 10px
            color: rgb(147,153,159)
        .cart-add
            display: inline-block
            line-height : 24px
            padding : 6px
            font-size: 24px
            color : rgb(0,160,220)
        
        
</style>