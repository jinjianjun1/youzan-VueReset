import foot from 'components/foot.vue'
import swiper from 'components/swip.vue'
let mixin={
    filters: {
        setPrice(val){
            val=Number(val)
              return val.toFixed(2)
        }  
      },
    components:{
        foot,
        swiper
    }
}

export default mixin