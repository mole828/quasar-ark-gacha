<template>
  <div>

    <div class="col">
      <ark-card>
        <template #default>
          <Gacha :callback="callback"/>
        </template>
      </ark-card>
    </div>

    <div class="col">
      <ark-card>
        <template #default>
          <GachaRegister></GachaRegister>
        </template>
      </ark-card>

      <ark-card>
        <template #default>
          <GachaStatistic :key="uid" :uid="uid"/>
        </template>
      </ark-card>
    </div>

  </div>
</template>

<script>

import Gacha from "@/components/gacha/Gacha";
import ArkCard from "@/components/ui/ArkCard";
import GachaRegister from "@/components/gacha/GachaRegister";
import GachaStatistic from "@/components/gacha/GachaStatistic";
export default {
  name: 'App',
  components: {
    GachaStatistic,
    GachaRegister,
    ArkCard,
    Gacha,
  },
  data(){
    return{
      uid: undefined,
    }
  },
  methods:{
    callback(uid){
      //console.log(doc)
      this.uid=uid
      //this.title=doc.nickName
    }
  },
}
document.title="ArkNights Gacha Statistic"
</script>

<style>
  .col{
    float: left;
    min-width: 580px;
    max-width: 50%;
  }
</style>
