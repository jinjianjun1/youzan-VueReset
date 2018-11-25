import fetch from 'js/fetch.js'
import url from 'js/api.js'
import fetchget from 'js/fetchget.js'

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