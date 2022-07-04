<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="item in getTargetId" :key='item'>
      <div class="bg-cover" :style="{backgroundImage:`url(${item})`}">
        <img src="../assets/imgs/Group 11.svg" alt="">
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  props: ['getTargetId'],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: true,
        speed: 1000,
        loop: true,
      },
    };
  },
};

</script>
<style lang="scss" scoped>
 .bg-cover{
   background-size:cover;
   background-position: center center;
   height: 500px;
    img{
      margin-top:46px;
    }
   @media (min-width: 480px) and (max-width: 1024px){
     height: 432px;
     img{
      margin-top:40px;
    }
   }
   @media all and (max-width: 479px){
     height: 360px;
     img{
      margin-top:37px;
     }
   }
  }
</style>
