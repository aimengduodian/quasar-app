<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <q-avatar size="sm" text-color="white" color="primary" icon="remove"/>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <q-avatar size="sm" text-color="white" color="primary" icon="add" @click.stop="add"/>
  </div>
</template>

<script>
  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      add (event) {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('change', event.target)
        this.$forceUpdate()
      },
      decrease () {
        if (this.food.count) {
          this.food.count--
        }
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../css/variable"

  .cartcontrol
    display: flex
    align-items: center

    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1

      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear

      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)

    .cart-count
      margin-right: 6px
      width: 12px
      line-height: 24px
      text-align: center
      font-size: $fontsize-small-s
      color: $color-grey

    .cart-add
      display: inline-block
      padding: 1px
      line-height: 12px
      font-size: $fontsize-large-xxx
      color: $color-blue
</style>
