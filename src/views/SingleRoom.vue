<template>
  <div class="Room">
    <loading :active.sync="isLoading">
      <img src="@/assets/imgs/103.svg" alt="">
    </loading>
    <swiper :getTargetId='roomInfo.imageUrl'></swiper>
    <div class="singleRoom">
      <div class="singleRoom_content">
        <div class="singleRoom_content_title">
          <h1>{{ roomInfo.name }}</h1>
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
        <p class="singleRoom_content_des">{{ roomInfo.description }}</p>
        <div class="singleRoom_content_check">
          <font>
            check-in:{{ checkInAndOut.checkInEarly }}
            ~{{ checkInAndOut.checkInLate }}/
            check-out:{{ checkInAndOut.checkOut }}
          </font>
        </div>
        <div class="singleRoom_content_price">
          <font>
            Weekday(Mon - Thu):{{ roomInfo.normalDayPrice | currency }}
            /
            Weekend(Fri - Sun):{{ roomInfo.holidayPrice | currency }}
          </font>
        </div>
        <section class="singleRoom_content_amenities">
          <ul>
            <li :class="{'active':amenities['Mini-Bar']}">
              <i class="fas fa-glass-martini-alt"></i>
              <span>Mini bar</span>
            </li>
            <li :class="{'active':amenities['Wi-Fi']}">
              <i class="fa fa-wifi"></i>
              <span>Wifi</span>
            </li>
            <li :class="{'active':amenities['Smoke-Free']}">
              <i class="fas fa-smoking"></i>
              <span>Smoke</span>
            </li>
            <li :class="{'active':amenities['Air-Conditioner']}">
              <i class="fas fa-snowflake"></i>
              <span>AC</span>
            </li>
            <li :class="{'active':amenities['Room-Service']}">
              <i class="fas fa-concierge-bell"></i>
              <span>Room Service</span>
            </li>
            <li :class="{'active':amenities.Sofa}">
              <i class="fas fa-couch"></i>
              <span>Sofa</span>
            </li>
            <li :class="{'active':amenities['Pet-Friendly']}">
              <i class="fas fa-dog"></i>
              <span>Pets</span>
            </li>
            <li :class="{'active':amenities['Great-View']}">
              <i class="fas fa-mountain"></i>
              <span>Scenery</span>
            </li>
            <li :class="{'active':amenities.Television}">
              <i class="fas fa-tv"></i>
              <span>Television</span>
            </li>
            <li :class="{'active':amenities.Breakfast}">
              <i class="fas fa-utensils"></i>
              <span>Breakfast</span>
            </li>
            <li :class="{active:amenities.Refrigerator}">
              <i class="fas fa-thermometer-empty">
                </i><span>Refrigerator</span>
              </li>
            <li :class="{active:amenities['Child-Friendly']}">
              <i class="fas fa-baby"></i>
              <span>Children</span>
            </li>
          </ul>
        </section>
      </div>
      <div class="singleRoom_booking">
        <div class="calandar">
          <DatePicker
            mode="range"
            :value="null"
            color="gray"
            is-inline
            @dayclick='dayClicked'
            format="YYYY-MM-DD"
            :min-date="new Date()"
            :disabled-dates='disabledDate'
            class='date-picker'
            :max-date="maxDate"
            :locale="{ id: 'en', firstDayOfWeek: 1,
              masks: { weekdays: 'WWW', data: ['YYYY-MM-DD'],}}"
          />
        </div>
        <div class="totalPrice" v-if="workingdays>0 || holidays>0">
          <p><span>Room</span><span>{{ totalPrice|currency }}</span></p>
          <p><span>Tax</span><span>$0</span></p>
          <p><span>Total</span><span>{{ totalPrice|currency }}</span></p>
          <a href="#" @click="reservation">Order</a>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import mixins from '@/mixins';
import swiper from '../components/Swiper.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'singleroom',
  mixins: [mixins],
  components: {
    DatePicker,
    swiper,
    Footer,
  },
  data() {
    return {
      roomId: this.$route.params.id,
    };
  },
  methods: {
    reservation() {
      if (this.booking.date.length > 0) {
        this.$store.dispatch('setReservationDate', {
          roomId: this.roomId,
          date: this.booking.date,
        })
          .then(() => {
            this.$router.push({ name: 'reservation', params: { id: this.roomId } });
          });
      }
    },
  },
  computed: {
    singleRoom() {
      return this.$store.state.singleRoom;
    },
    roomInfo() {
      return this.$store.state.roomInfo;
    },
    descriptionShort() {
      return this.$store.state.descriptionShort;
    },
    checkInAndOut() {
      return this.$store.state.checkInAndOut;
    },
    amenities() {
      return this.$store.state.amenities;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$store.dispatch('getSingleRoom', this.roomId);
  },
};
</script>
<style lang="scss" scoped>
  .Room{
    min-height: 100%;
    padding-bottom: 100px;
    position: relative;
    box-sizing: border-box;
  }
  .date-picker{
    border:none;
    color:#2c3e50;
    font-family:"Open Sans",'微軟正黑體', Helvetica, Arial, sans-serif;
  }
  .singleRoom{
    display: flex;
    justify-content:center;
    margin:24px 42px;
    @media (max-width: 768px){
      flex-wrap: wrap;
      margin:24px 10px;
    }
    &_content{
      width: 70%;
      margin-right: 72px;
      @media (min-width: 769px) and (max-width: 1024px){
         margin-right: 20px;
      }
      @media (max-width: 768px){
        width: 100%;
        margin-right: 0;
        margin-left: 10px;
      }
      &_title{
        display: flex;
        @media (max-width: 769px){
          flex-wrap: wrap;
          justify-content: center;
        }
        h1{
          display: inline-block;
          font-size: 30px;
          color: #4C5356;
          margin-right: 23px;
          vertical-align: middle;
          letter-spacing: 2px;
          @media (min-width: 769px) and (max-width: 1024px){
            margin-right: 15px;
            font-size: 25px;
          }
          @media (max-width: 768px){
            width: 100%;
          }
        }
        span{
          display: inline-block;
          color: #4C5356;
          font-size: 12px;
          align-self: center;
          margin-top: 8px;
        }
        span+span{
          margin-left: 18px;
          @media (min-width: 769px) and (max-width: 1024px){
             margin-left: 10px;
          }
        }
        img{
          vertical-align: middle;
          margin-bottom: 1px;
        }
      }
      &_des{
        text-align: left;
        margin-top: 32px;
        margin-bottom: 26px;
        line-height: 19px;
        font-size: 15px;
        letter-spacing: 2px;
        @media (max-width: 768px){
          margin-bottom: 35px;
        }
      }
      &_check,&_price{
        text-align: left;
        margin-bottom: 10px;
        font{
          font-size: 14px;
          letter-spacing: 2px;
        }
      }
      &_amenities{
        margin-top: 56px;
        ul {
          display: flex;
          flex-wrap: wrap;
          @media (max-width: 768px){
            justify-content: center;
          }
          li{
            color: #C2C2C2;
            font-size: 12px;
            width: 20%;
            text-align: left;
            @media (max-width: 768px){
              width: 30%;
            }
            &.active {
              color: #272E31;
            }
            i{
              margin-right: 2px;
              @media (max-width: 768px){
                margin-top:24px;
              }
            }
          }
          li:nth-child(4n){
            margin-right: 5px;
            @media (max-width: 768px){
             margin-right: 5px;
            }
          }
          li:nth-child(n+5){
            margin-top: 24px;
            @media (max-width: 768px){
             margin-top: 0px;
            }
          }
        }
      }
    }
    &_booking{
      width: 30%;
      display:flex;
      flex-direction: column;
      align-items: right;
      @media (min-width: 480px) and (max-width: 768px){
        width: 100%;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 30px;
      }
      @media (max-width: 479px){
        width: 100%;
        margin-top: 50px;
        flex-direction: column;
        align-items: center;
      }
      .calandar{
        margin-left: auto;
        @media (max-width: 768px){
          margin-left: 0;
        }
      }
      .totalPrice{
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
          width: 125px;
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
  }
</style>
