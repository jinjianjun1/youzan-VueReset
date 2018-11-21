import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import asios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el:'.container',
    data:{
        lists:null
    },
    computed:{

    },
    created:{

    },
    methods:{
        getlists(){
            axios.post(url.cartlists).then(res=>{
                this.lists=res.data.cartList
            })
        }
    },
    mixins: [mixin]

})