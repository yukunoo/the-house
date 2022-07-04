<template>
  <div class="res">
    <loading :active.sync="isLoading">
      <img src="@/assets/imgs/103.svg" alt="">
    </loading>
    <div class="reservation">
      <div class="reservation_RoomList bg-cover"
        :style="{backgroundImage:`url(${imgUrl})`}">
        <h2>{{roomInfo.name}}</h2>
        <div class="des">
          <span><img src="../assets/imgs/typcn-user.svg" alt="">
            {{ descriptionShort.GuestMax }}
          </span>
          <span><img src="../assets/imgs/fa-solid_bed.svg" alt="">
            {{ descriptionShort.Bed[0] }}
          </span>
          <span>
            <img src="../assets/imgs/uil-bath.svg" alt="" >
            {{ descriptionShort['Private-Bath']}}
          </span>
          <span><img src="../assets/imgs/geo-turf-size.svg" alt="">
            {{ descriptionShort.Footage }}m²
          </span>
        </div>
      </div>
      <div class="reservation_User">
        <img src="../assets/imgs/Group 11.svg" alt="">
        <h2>Your Reservation</h2>
        <div class="input">
          <input type="text" class="input_name" placeholder="Name" v-model="name">
          <input type="text" class="input_Phone" placeholder="Phone" v-model="phone">
          <div class="calandar">
            <span v-if="workingdays>0 || holidays>0">{{reservationFrom}}~{{reservationTo}}</span>
            <i class="far fa-calendar-alt calandar_icon"></i>
          </div>
        </div>
        <div class="totalPrice" v-if="workingdays>0 || holidays>0">
          <p><span>Room</span><span>{{ totalPrice|currency }}</span></p>
          <p><span>Tax</span><span>$0</span></p>
          <p><span>Total</span><span>{{ totalPrice|currency }}</span></p>
          <a href="#" @click.prevent="reserveRoom">Confirm</a>
        </div>
      </div>
    </div>
    <Footer/>
    <div v-if="success" class="alert success">
      <a href="#" @click="close">
        <img src="../assets/imgs/ion-ios-close.svg" alt="" class="close">
      </a>
      <div>
        <h2>Success!</h2>
        <p>Have a nice trip :)</p>
        <img src="../assets/imgs/ant-design_check-circle-outline.svg" alt="">
        <a href="#" @click.prevent='toSingleRoom'>check out the order</a>
      </div>
    </div>
    <div v-if="fall" class="alert false">
      <a href="#" @click="close">
        <img src="../assets/imgs/ion-ios-close.svg" alt="" class="close">
      </a>
      <div>
        <h2>Oops!!</h2>
        <p>The room has been booked.<p>
        <p>Please choose another room.</p>
        <img src="../assets/imgs/ic-baseline-error-outline.svg" alt="">
        <a href="#" @click.prevent='toSingleRoom'>Back</a>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '@/mixins';
import Footer from '../components/Footer.vue';

export default {
  name: 'reservation',
  mixins: [mixins],
  components: {
    Footer,
  },
  data() {
    return {
      singleRoom: {},
      roomId: this.$route.params.id,
      name: '',
      phone: '',
      success: false,
      fall: false,
    };
  },
  methods: {
    reserveRoom() {
      if (this.name === '' || this.phone === '') {
        return;
      }
      this.$store.commit('LOADING', true);
      this.$store.dispatch('roomBooking', {
        roomId: this.roomId,
        roomName: this.roomInfo.name,
        name: this.name,
        phone: this.phone,
        date: this.reservation.date,
      }).then(() => {
        if (this.$gtm.enabled()) {
          this.$gtm.trackEvent({
            event: 'success-link', // Event etype [default = 'interaction'] (Optional)
            name: this.name,
            phone: this.phone,
            room_id: this.$route.params.id,
          });
        }
        this.success = true;
      }).catch(() => {
        this.fall = true;
      }).finally(() => {
        this.$store.commit('LOADING', false);
      });
    },
    close() {
      this.success = false;
      this.fall = false;
    },
    toSingleRoom() {
      this.$router.push({ name: 'singleroom', params: { id: this.roomId } });
    },
  },
  computed: {
    roomInfo() {
      return this.$store.state.roomInfo;
    },
    descriptionShort() {
      return this.$store.state.descriptionShort;
    },
    reservation() {
      return this.$store.state.reservation;
    },
    imgUrl() {
      return this.$store.state.imgUrl;
    },
    reservationFrom() {
      return this.reservation.date[0];
    },
    reservationTo() {
      const d = new Date(this.reservation.date[this.reservation.date.length - 1]);
      return this.dateFormat(this.addDate(d, 1));
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$store.dispatch('getSingleRoom', this.roomId)
      .then(() => {
        this.calDate(this.reservationFrom, this.reservationTo);
      });
  },
};
</script>
<style lang="scss" scoped>
  .res{
    min-height: 100%;
    position: relative;
    box-sizing: border-box;
  }
  .reservation{
    display: flex;
  }
  .reservation_RoomList{
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    h2{
      margin-top: 171px;
      font-size: 30px;
      color: #4C5356;
      letter-spacing: 2px;
    }
    .des{
      margin-top: auto;
      margin-bottom: 83px;
      span+span{
        margin-left: 24px;
      }
      img{
        margin-left: 3px;
      }
    }
  }
  .reservation_User{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      margin-top:37px
    }
    h2{
      margin-top: 95.7px;
      margin-bottom: 96px;
      font-size: 30px;
      color: #4C5356;
      letter-spacing: 2px;
    }
    .input{
      display: flex;
      flex-wrap: wrap;
      width: 370px;
      input{
        text-align: left !important;
        font-size: 20px;
        color:#4C5356;
        border:none;
        border-bottom: 1px solid #495156;
        width: 255px;
        display: block;
        letter-spacing: 2px;
        &:focus{
          outline: none;
        }
      }
      input+input{
        margin-top: 49px;
      }
      .calandar{
        width: 370px;
        margin-top: 49px;
        position: relative;
        font-size: 20px;
        color: #4C5356;
        display: flex;
        // width: 370px;
        &::before{
          content:'';
          position: absolute;
          width: 370px;
          border-bottom: 1px solid #495156;
          bottom: 0;
        }
        &_icon{
          margin-left: auto;
        }
        button{
          background-color:transparent;
          border:none;
          font-size: 20px;
          color: #4C5356;
          cursor: pointer;
          &:focus{
            outline: none;
          }
        }
      }
    }
    .totalPrice{
      width: 370px;
      margin-top: 30px;
      padding-right:10px;
      display: flex;
      flex-direction: column;
      align-items:flex-end;
      @media (min-width: 480px) and (max-width: 768px){
        margin-top: 50px;
        padding-right:0px;
      }
      @media (max-width: 479px){
        margin-top: 10px;
        margin-left: 90px;
      }
      p{
        display: flex;
        width: 145px;
        letter-spacing: 2px;
        &:first-child{
          margin-bottom: 10px;
        }
        &:nth-child(3){
          margin-top: 20px;
        }
        span:first-child{
          margin-right: auto;
        }
      }
      a{
        letter-spacing: 2px;
        display: block;
        box-sizing: border-box;
        margin-top: 30px;
        margin-left: auto;
        padding: 11px 32px;
        background: #495156;
        box-shadow: 1px 1px 5px 0 #495156;
        border-radius: 25px;
        font-size: 20px;
        color: #FFFFFF;
        border:none;
        text-decoration: none;
      }
    }
  }
  .bg-cover{
    background-size:cover;
    background-position: center center;
   }
   .alert{
     position:absolute;
     top: 50%;
     transform: translate(-50%,-50%);
     left: 50%;
     background: #F6F6F6;
     padding: 88px 100px 64px 100px;
     &.fade{
       display: none;
     }
     .close{
       position: absolute;
       top: 20px;
       right: 20px;
     }
     >div{
       h2{
          font-size: 30px;
        }
        p{
          font-size: 20px;
          margin-top: 15px;
          letter-spacing: 2px;
        }
        img{
          margin:38px auto 30px auto;
          display:block;
        }
        a{
          letter-spacing: 2px;
          display: block;
          box-sizing: border-box;
          margin-top: 30px;
          margin-left: auto;
          padding: 11px 32px;
          background: #495156;
          box-shadow: 1px 1px 5px 0 #495156;
          border-radius: 25px;
          font-size: 20px;
          color: #FFFFFF;
          border:none;
          text-decoration: none;
        }
     }
   }
</style>
