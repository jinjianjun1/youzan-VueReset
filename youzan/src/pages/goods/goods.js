import './goods_common.css'
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
let{id}=qs.parse(location.search.substr(1))
let detailTab=['商品详情','本店成交']
new Vue({
    el:'#app',
    data:{
        goodslist:null,
        detailTab,
        currentIndex:0,
        deallist:null
    },
    created(){
        this.getlists()
    },
    methods:{
        getlists(){
            axios.get(url.details,{params:{id}           
            }).then(res=>{
                //console.log(res)
                this.goodslist=res.data.data
                this.goodslist.skuList
            })
        },
        setActive(id){
            this.currentIndex=id
            if(this.currentIndex==1){
                this.getDeal()
            }

        },
        getDeal(){
            axios.get(url.deal,{params:{id}}).then(
               res=>{             
                 this.deallist=res.data.data.lists
                 console.log(this.deallist)
               }
                
            )
        }
    },
    mixins:[mixin]
})