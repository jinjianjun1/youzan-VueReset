import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
let {keyword,id}=qs.parse(location.search.substr(1))
import { InfiniteScroll } from 'mint-ui';
import Velocity from 'velocity-animate'

Vue.use(InfiniteScroll);
new Vue({
    el:'.container',
    data:{
        searchData:null,
        keyword,
        isShow:false,       
        pageNum:1,
        pageSize:8,
        isAllloaded:false,
       // loading:false,
         onloading:false
    },
    created(){
        this.getSearchlist()
    },
    methods:{
        getSearchlist(){
            this.onloading=true
            if(this.isAllloaded) return
           //this.loading=true
            axios.get(url.searchlist,{
                params:{
                    keyword,
                    id,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,         
                }
            }).then(res=>{      
                console.log(this.pageSize,this.pageNum)
                let currentLists=res.data.lists   
                console.log(currentLists.length)
                if(currentLists.length<this.pageSize ){
                    this.isAllloaded=true
                }
                if(this.searchData){
                    
                    this.searchData=this.searchData.concat(currentLists)
                }else{
                    this.searchData=currentLists
                }      
                //this.loading=false
                this.pageNum++ 
                 this.onloading=false                
            }).catch(err=>{
                console.log(err)
            })
        },
        move(){
            console.log(document.documentElement.scrollTop,'111111111111')

            if(document.documentElement.scrollTop>60){
                this.isShow=true
            }else{
                this.isShow=false
            }
        },
        toTop(){
            Velocity(document.body,'scroll',{duration:1000})
        }
    },
    mixins:[mixin]
})