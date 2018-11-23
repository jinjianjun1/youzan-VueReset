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
    total: 0, //结算总价
    editingShop: null, //因为页面底部编辑状态不在遍历的列表里，所以定义个全局变量来判断是否处于编辑状态
    editingShopIndex: -1,
    removePopup: false, //点击删除 变为true 弹出删除框
    removeData: null,
    removeMsg:''
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
    allRemveSelect: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
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
      return []
    },
    removeList() { //要删除的商品列表
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  methods: {
    getlists() {
      axios.get(url.cartlist).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = true
            good.removeChecked = false
          })
        });
        this.lists = lists
      })
    },
    chosePick(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    choseShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    choseAll() {
      let attr = this.editingShop ? 'allRemveSelect' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) { //激发编辑状态
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, i) => {
        if (i != shopIndex) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : "编辑"
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(good) {
      if (good.number === 1) return
      axios.post(url.reduce, {
        id: good.id,
        number: 1
      }).then(res => {
        good.number--
      })
    },
    add(good) {
      axios.post(url.add, {
        id: good.id,
        number: 1
      }).then(res => {
        good.number++
      })
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      }
      this.removeMsg='确定要删除该商品吗？'

    },
    removeConfirm() {
      let {shop,shopIndex, good, goodIndex} = this.removeData
      axios.post(url.remove, {
        id: good.id
      }).then(res => {
        shop.goodsList.splice(goodIndex, 1)
        if (!shop.goodsList.length) {
        this.lists.splice(shopIndex,1)
        this.removeShop()
        }
        this.removePopup = false

      })
    },
    removeShop(){
      this.editingShop=null  //退出编辑状态
      this.editingShopIndex=-1
      this.lists.forEach(shop=>{//将其他店铺的状态重置 返回'编辑'
        shop.editing=false
        shop.editingMsg='编辑'
      })
    }
  },
  mixins: [mixin]

})
