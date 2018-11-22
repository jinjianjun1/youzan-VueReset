import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    ischose: false,
    total: 0,
    editingShop:null,//因为页面底部编辑状态不在遍历的列表里，所以定义个全局变量来判断是否处于编辑状态
    editingShopIndex:-1
  },

  created() {
    this.getlists()
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(val) {
        this.lists.forEach(shop => {
          shop.checked = val
          shop.goodsList.forEach(good => {
            good.checked = val
          })
        })
      }
    },
    selectList() { //把总价计算出来 并返回出一个选择购买的列表
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
    },
    removeList(){

    }
  },
  methods: {
    getlists() {
      axios.get(url.cartlist).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked=false
          shop.editing = false
          shop.editingMsg='编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked=false
          })
        });
        this.lists = lists
      })
    },
    chosePick(shop, good) {
      good.checked = !good.checked
      shop.checked = shop.goodsList.every(good => {
        return good.checked
      })
    },
    choseShop(shop) {
      shop.checked = !shop.checked
      shop.goodsList.forEach(good => {
        good.checked = shop.checked
      })
    },
    choseAll() {
      this.allSelected = !this.allSelected
    },
    edit(shop,shopIndex){//激发编辑状态
        shop.editing=!shop.editing
        shop.editingMsg=shop.editing? '完成':'编辑'
        this.lists.forEach((item,i)=>{
            if(i!=shopIndex){
                item.editing=false
                item.editingMsg=shop.editing ? '':"编辑"
            }
        })
        this.editingShop=shop.editing? shop:null
        this.editingShopIndex=shop.editing?shopIndex:-1
    }
  },
  mixins: [mixin]

})
