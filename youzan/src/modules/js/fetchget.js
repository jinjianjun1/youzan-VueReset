import axios from 'axios'
function fetchget(url,data){
    return new Promise((resolve,reject)=>{
         axios.get(url,{params:{data}}).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(res)
        })
    })
}
export default fetchget