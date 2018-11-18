import 'css/common.css'
import './index.css'
import  Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'


import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
import mixin from 'js/mixin.js'
// import swiper from 'components/swip.vue'

new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,//可以继续加载数据,
        allloaded:false,
        bannerlists:null
    },
    // components:{
    //     swiper
    // },
    created(){
        this.getlists()
        this.getbanner()
    },
    methods:{
        getlists(){
            if(this.allloaded==true) return
            this.loading=true
            axios.get(url.hotLists,{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                let currentlist =res.data.lists
                if(currentlist.length<this.pageSize){
                    this.allloaded=true
                }
                if(this.lists){
                    this.lists= this.lists.concat(currentlist)
                }else{
                    this.lists=currentlist
                }
                this.loading=false
                this.pageNum++
                console.log(this.pageNum,this.pageSize)
            })
        },
        getbanner(){
            axios.get(url.banner).then(res=>{
                this.bannerlists=res.data.lists
            }).catch(err=>{
                console.log(err)
            })
        },
        
    },
    mixins: [mixin]
})