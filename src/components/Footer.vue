<template>
  <div>
    <footer>
    <ul class="footerList">
      <li><a href="#">Reservation</a></li>
      <li><a href="#">About TheHouse</a></li>
      <li><a href="#">FAQ</a></li>
      <li><a href="#">Contact us</a></li>
    </ul>
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
  }
  .footerList{
    display: flex;
    justify-content: center;
    li{
      padding:14px 0 18px 0;
      position: relative;
      a{
        color:#EEF3F5;
        text-decoration: none;
        &:hover{
        color:#c5c7c9;
        }
      }
    }
    li+li{
      margin-left: 44px;
      @media (max-width: 479px){
        margin-left: 22px;
      }
    }
    li+li::before{
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      background-color:#EEF3F5;
      left: -22px;
      bottom: 50%;
      @media (max-width: 479px){
        left: -12px;
        bottom: 45%;
      }
    }
  }
</style>
