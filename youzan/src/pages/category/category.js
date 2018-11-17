import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import foot from 'components/foot.vue'
import url from 'js/api.js'
new Vue({
    el:'#app',
    components:{
        foot
    },
    data:{
        toplists:null,
        topindex:0,
        subData:null,
        rankData:null,
    },
   created(){
       this.getToplists()
       this.getsublists(0,0)
   },
    methods:{
        getToplists(){
            axios.get(url.toplist).then(res=>{
                this.toplists=res.data.lists
                
                //console.log(this.toplists)
            }).catch(err=>{
                throw err
            })
        },
        getsublists(id,index){
            this.topindex=index
           if(index==0){
             this.getranklists()
           }else{
          axios.get(url.sublist,{id}).then(res=>{
              
                this.subData=res.data.data
            }).catch(err=>{
                console.log(err)
            })
           }
            
         },
         getranklists(){
            axios.get(url.ranklist).then(res=>{
                  this.rankData=res.data.data
              }).catch(err=>{
                  console.log(err)
              })
         }
    },
    filters: {
      setPrice(val){
          val=Number(val)
            return val.toFixed(2)
      }  
    }
  
})