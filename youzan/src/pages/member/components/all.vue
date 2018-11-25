<template>
    <div>
        <div class="container " style="min-height: 597px;">
            <div  v-if="lists&&lists.length" class="block-list address-list section section-first js-no-webview-block">
                <a  class="block-item js-address-item address-item"
                    v-for="list in lists" :key="list.id"
                    @click="toEdit(list)" :class="{'address-item-default':list.isDefault}" >
                    <div class="address-title">{{list.name}}{{list.tel}}</div>
                    <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
                    <a class="address-edit">修改</a>
                </a>             
            </div>
            <div v-if="lists&&!lists.length">
                请添加您的地址
            </div>
            <div class="block stick-bottom-row center">
            <router-link :to="{name:'form',query:{type:'add'}}" class="btn btn-blue js-no-webview-block js-add-address-btn" href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;from=">
                    新增地址
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Address from 'js/addressService.js'
export default {
    data(){
        return {
            lists:null
        }
    },
    created() {
        Address.list().then(res=>{
            this.lists=res.data.lists
        })
    },
    methods:{
        toEdit(list){
            this.$router.push({
               name:'form',
               query:{
                   type:'edit',
                   instance:list
               }
            })
        }
    }
};
</script>

<style scoped>
</style>