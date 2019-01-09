import fetch from '../../modules/js/fetch.js'
import url from '../../modules/js/api.js'
import fetchget from '../../modules/js/fetchget.js'

class Cart{
    static add(id){
      return  fetch(url.add,{
            id,number:1
        })
    }
    static reduce(id){
        return fetch(url.reduce,{id,number:1})
    }
    static getList(){
        return fetchget(url.addressList)
    }
}

export default Cart
