<template>
<div class="goods">
    <div class="menu-wra" ref="menuScroll">
      <!-- 如果index等于currentIndex,就为这个li添加一个current类，改变左侧导航栏的背景颜色-->
     <ul>
       <li v-for="(item,index) in goods"
        class="menu-item "
         :class="{'current': currentIndex === index}" 
         @click="selectMenu(index)">
         <span class="text border-1px" >
           <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
         </span>
         </li>
     </ul>
      </div>
    <div class="foods-wra" ref="foodScroll">
        <ul style="margin: 0;padding: 0;">
          <li v-for="(item,index) in goods" class="food-list food-list-hook" style="list-style: none;">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wra">
                    <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                  </div>
                    
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    <shopcart  ref='shopcart'  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  
    data() {
      return {
        scrollY: 0,
        foodScroll: null,
        goods: [],
        listHeight: []

        }
      
    },
    methods: {
      getHeight() {
      let foodList = this.$refs.foodScroll
      let foodListChild = foodList.getElementsByClassName('food-list-hook');
      //定义临时变量
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodListChild.length; i++) {
        let item = foodListChild[i];
        height += item.clientHeight;
        this.listHeight.push(height)
        
      }
      console.log(this.listHeight)
  },
      selectMenu(index) {
        let foodList = this.$refs.foodScroll
        let foodListChild = foodList.getElementsByClassName('food-list-hook')
        let el = foodListChild[index]
        console.log(index)
        this.foodScroll.scrollToElement(el,300)
      },
      _menuScroll() {
        let scrollDOM = this.$refs.menuScroll;
        let menuScroll = new BScroll(scrollDOM,{
            
            click: true
        })
      },
      _foodScroll() {
        var scrollDOM = this.$refs.foodScroll
        this.foodScroll = new BScroll(scrollDOM,{
          
           click: true,
           probeType: 3
        })
        var that = this
        this.foodScroll.on('scroll',function(pos){
          that.scrollY = Math.abs(Math.round(pos.y))
          console.log(that.scrollY)
        })
      },
      cartAdd(target) {
        this.$nextTick(()=>{
           this.$refs.shopcart.drop(target)
        })
       
      }
    },
  
  created() {
       this.classMap= ['decrease','discount','guarantee','invoice','special']
       this.$http.get('/api/goods').then((response) =>{
        response = response.body
        if(response.errno === ERR_OK){
          this.goods = response.data
          console.log(this.goods);
          this.$nextTick(()=>{
            this.getHeight();
            this._menuScroll();
            this._foodScroll();
          })
        }else{
          console.log('no data')
        }
     });
   },
   components: {
     shopcart,
     cartcontrol
   },
   computed: {
     // 比较scroll 和 右边分栏高度，返回index
     currentIndex() {
       for (let i = 0; i < this.listHeight.length; i++) {
         console.log(this.scrollY)
         let height1 = this.listHeight[i]
         let height2 = this.listHeight[i+1]

         if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
           return i;
           
         }
         
       }
       return 0
     },
      selectFoods() {
        let foods = []
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
   
   }
}
</script>

<style  lang='stylus' rel="stylesheet/stylus">
@import "../../common/stylus/mixni.styl";

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%   
    overflow: hidden
    .menu-wra
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item // li
        display: table;
        height: 54px;
        width: 56px;
        padding:0 12px;
        line-height: 14px;
        &.current
          position:relative;
          z-index:10;
          margin-top:-1px;
          background:#fff;
          .text
            border-none()
            font-weight:bold;
        .text // 文字
          display: table-cell
          font-size: 12px  
          width: 56px
          font-weight: 200
          vertical-align: middle;
          border-1px(rgba(0,0,0,0))
          &.last-child
            margin-bottom: 0px
          .icon // 图片
              display: inline-block
              width: 12px
              height: 12px 
              margin-righ: 2px
              vertical-align: top /* 设置对齐方式 */
              background-size: 12px 12px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_3')
              &.discount
                bg-image('discount_3')
              &.guarantee
                bg-image('guarantee_3')
              &.invoice
                bg-image('invoice_3')
              &.special
                bg-image('special_3')
      
    .foods-wra
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9ddel
        font-size: 12px
        color: rgb(147,153,159)
        background-color: #f3f5f7
      .food-item
        //list-style: none;
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
            flex: 0 0 57px
            margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            color: rgb(7,17,27)
            font-size: 14px
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
          
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wra
              position: absolute
              right: 0
              bottom : 12px

</style>