import './goods_common.css'
import './goods_base.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import Vue from 'vue'
import mixin from 'js/mixin.js'
import url from 'js/api.js'
import qs from 'qs'
import axios from 'axios'
let {id} = qs.parse(location.search.substr(1))
let detailTab = ['商品详情', '本店成交']
new Vue({
  el: '#app',
  data: {
    id,
    goodslist: null,
    detailTab,
    currentIndex: 0,
    deallist: null,
    bannerlists: null,
    skuType: null,
    showSku: false,//判断弹出还是返回 遮罩和购物栏
    skuNum: 1,//购买数量
    showAddMsg:false,//加入购物车成功后提示信息
    isAddCart:false //判断是否已加入购物车 加入后显示图标
  },
  created() {
    this.getlists()
  },
  methods: {
    getlists() {
      axios.get(url.details, {
        params: {
          id
        }
      }).then(res => {
        //console.log(res)
        this.goodslist = res.data.data
        this.bannerlists = []
        this.goodslist.imgs.forEach(item => {  //将url中的数据改造成对象的格式
          this.bannerlists.push({
            clickUrl: '',
            img: item
          })
        });
      })
    },
    setActive(id) {
      this.currentIndex = id
      if (this.currentIndex === 1) {
        this.getDeal()
      }

    },
    getDeal() {
      axios.get(url.deal, {
        params: {
          id
        }
      }).then(
        res => {
          this.deallist = res.data.data.lists
        }

      )
    },
    choseSku(num) {
      this.skuType = num
      this.showSku = true
    },
    changeNum(val) {
      if (val < 0 && this.skuNum === 1) return
      this.skuNum += val

    },
    addCart(){
        axios.post(url.add,{id,number:this.skuNum}).then(res=>{
            if(res.data.status===200){
                this.showSku=false
                this.isAddCart=true
                this.showAddMsg=true

                setInterval(()=>{
                    this.showAddMsg=false
                },1000)
            }
        })
    }
  },
  watch: {
    showSku(val, oldVal) {
      document.body.style.overflow = val ? 'hidden' : 'auto';
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto';
      document.body.style.height = val ? '100%' : 'auto';
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },
  mixins: [mixin]
})
