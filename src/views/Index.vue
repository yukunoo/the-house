<template>
  <div class="Home">
    <loading :active.sync="isLoading">
      <img src="@/assets/imgs/103.svg" alt="">
    </loading>
    <div class="">
      <div class="banner">
        <div class="logo bgCover"></div>
      </div>
      <section>
        <ul class="roomList" >
          <li v-for="item in rooms" :key="item.id">
            <a href="#" @click.prevent='goSingleRoom(item.id)'>
              <div class="roomList_bg bgCover"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
              </div>
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Footer,
  },
  data() {
    return {
    };
  },
  methods: {
    goSingleRoom(id) {
      this.$router.push(`/singleRoom/${id}`);
    },
  },
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$store.dispatch('getRoom');
  },
};
</script>
<style lang="scss" scoped>
  .Home{
      min-height: 100%;
      padding-bottom: 100px;
      position: relative;
      box-sizing: border-box;
  }
  .banner{
    background-image: url(../assets/imgs/homepage_banner.svg);
    background-size: cover;
    background-position: center center;
    height: 448px;
    padding-top:98px;
  }
  .bgCover{
    background-size: cover;
    background-position: center center;
  }
  .logo{
    background-image: url(../assets/imgs/homepage_logo.svg);
    width: 341px;
    height: 52px;
    margin:0 auto;
  }
  section{
    margin:28px auto;
  }
  .roomList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin:0 auto;
    li{
      width: 33.33333%;
      padding-left: 40px;
      padding-right: 40px;
      &:nth-child(n+4) {
        margin-top:45px;
      }
      @media (min-width: 480px) and (max-width: 768px) {
        width: 50%;
        &:nth-child(n+4){
          margin-top: 0;
        }
        &:nth-child(n+1){
          margin-top:45px;
        }
      }
      @media (max-width: 479px) {
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
        &:nth-child(n+1){
          margin-top:0px;
        }
      }
      &:hover{
        .roomList_bg,p{
          transform: scale(1.1,1.1);
        }
      }
      a{
        text-decoration: none;
        color:black;
      }
      p{
        margin-top:25px;
        transition:.8s;
      }
    }
    &_bg{
      margin:0 auto;
      border-left: 5px solid rgba($color: #495156, $alpha: 0.6);
      width: 180px;
      height: 198px;
      transition:.8s;
      @media (max-width: 479px) {
        width: 260px;
        height: 278px;
        margin-top:30px;
      }
    }
  }

</style>
