<template>
  <div>
    <footer>
      <router-link
      class="link"
        :to="{
          name: 'Home',
        }"
      > 返回首頁</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  footer{
    background: #495156;
    position: absolute;
    bottom:0px;
    left:0px;
    right: 0;
    height: 50px;
    line-height: 50px;
  .link{
    padding:14px 0 18px 0;
    color:#EEF3F5;
    text-decoration: none;
    &:hover{
      color:#c5c7c9;
    }
  }
}
</style>
