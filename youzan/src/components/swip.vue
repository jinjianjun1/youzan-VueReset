<template>
   <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists " :key="list.id">
            <a class="js-no-follow" :href="list.clickUrl">
                <img class="goods-main-photo fadeIn" :src="list.img">
            </a>
            </div>
            
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        name:'swiper',
        props:{
            lists:{
                type:Array,
                required:true
            },
            name:{}
        },
        created(){
            console.log(this.lists)
        },
        mounted(){
            // new Swiper('.swiper-container',{
            //     // direction: 'vertical',
            //     loop: true,
            //     pagination: {
            //         el: '.swiper-pagination',
            //         type: 'bullets'
            //     },
            //     // scrollbar: {
            //     //     el: '.swiper-scrollbar',
            //     // },
            // })
             var swiper = new Swiper('.swiper-container', {
                pagination: {
                el: '.swiper-pagination',
                },
                loop: true, 
                autoplay: {
                    delay: 3000,
                },
            });
        }
    }
</script>

<style scoped>
.swiper-slide img{
    width: 100%;
    height: 100%;
}
</style>