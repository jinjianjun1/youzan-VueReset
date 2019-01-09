import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'
import mixin from '../../modules/js/mixin.js'
import Volecity from 'velocity-animate'
import Cart from '../../modules/js/cartService.js'
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
          shop.checked = val;
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
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectList() { //把总价计算出来 并返回出一个选择购买的列表
      if (this.lists && this.lists.length) {
        let arr = [];
        let total = 0;
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good);
              total += good.price * good.number
            }
          })
        });
        this.total = total;
        return arr
      }
      return []
    },
    removeList() { //要删除的商品列表
      if (this.editingShop) {
        let arr = [];
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        });
        return arr
      }
      return []
    }
  },
  methods: {
    getlists() {
      axios.get(url.cartlist).then(res => {
        let lists = res.data.cartList;
        lists.forEach(shop => {
          shop.checked = true;
          shop.removeChecked = false;
          shop.editing = false;
          shop.editingMsg = '编辑';
          shop.goodsList.forEach(good => {
            good.checked = true;
            good.removeChecked = false
          })
        });
        this.lists = lists
      })
    },
    chosePick(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      good[attr] = !good[attr];
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    choseShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    choseAll() {
      let attr = this.editingShop ? 'allRemveSelect' : 'allSelected';
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) { //激发编辑状态
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? '完成' : '编辑';
      this.lists.forEach((item, i) => {
        if (i !== shopIndex) {
          item.editing = false;
          item.editingMsg = shop.editing ? '' : "编辑"
        }
      });
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(good) {
      if (good.number === 1) return;
      // axios.post(url.reduce, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number--
      // })
      Cart.reduce(good.id).then(res=>{
        good.number--
      })
    },
    add(good) {
      // axios.post(url.add, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number++
      // })
      Cart.add(good.id).then(res=>{
        good.number++
      })
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true;
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      }
      this.removeMsg='确定要删除该商品吗？'

    },
    removeConfirm() {
      if(this.removeMsg==='确定要删除该商品吗？'){
        let {shop,shopIndex, good, goodIndex} = this.removeData;
        axios.post(url.remove, {
          id: good.id//先将要删除商品的id发送给后台，在从本地删除
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1);
          if (!shop.goodsList.length) { 
          this.lists.splice(shopIndex,1);
          this.removeShop()
          }
          this.removePopup = false
        })
      }else{
        let ids=[];
        this.removeList.forEach(good=>{
          ids.push(good.id)
        });
        axios.post(url.meremove,{ids}).then(res=>{
          let arr=[];
          this.editingShop.goodsList.forEach(good=>{
            let index =this.removeList.findIndex(item=>{
              return item.id===good.id//判断商品是否在删除列表里面
            });
            if(index===-1){//如果不在就赋值给一个空数组里,之后可直接将该数组赋值给删除列表
              arr.push(good)
            }
          });
          if(arr.length){
            this.editingShop.goodsList=arr
          }else{
            this.lists.splice(this.editingShopIndex,1);
            this.removeShop()
          }
          this.removePopup=false
        })
      }
    },
    removeShop(){
      this.editingShop=null;  //退出编辑状态
      this.editingShopIndex=-1;
      this.lists.forEach(shop=>{//将其他店铺的状态重置 返回'编辑'
        shop.editing=false;
        shop.editingMsg='编辑'
      })
    },
    
    start(e,good){
      good.startX=e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex){
      let endX=e.changedTouches[0].clientX;
      let left='0';
      if(good.startX-endX>100){
        left='-60px'
      }
      if(endX-good.startX>100){
        left='0px'
      }
      Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{
        left
      })
    }
  },
  mixins: [mixin]

});
