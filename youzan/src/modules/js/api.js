let url ={
    hotLists:'/index/hotLists',
    banner:'/index/banner',
    toplist:'/category/topList',
    ranklist:'/category/rank',
    sublist:'/category/subList',
    searchlist:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    add:'/cart/add',
    cartlist:'/cart/list',
    reduce:'/cart/reduce',
    remove:'/cart/remove',
    meremove:'/cart/mrremove',
    addressList:'/address/list',
    addressAdd:'/address/add',
    addressUpdate:'/address/update',
    addressRemove:'/address/remove',
    addressSetDefault:'/address/setDefault'
}
//开发环境和真实环境切换
let host = 'http://rap2api.taobao.org/app/mock/7058'

for ( let key in url){
    if(url.hasOwnProperty(key)){
        url[key]=host +url[key]
    }
}

export default url