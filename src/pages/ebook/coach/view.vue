<template>
  <q-page class="docs-carousel">
    <q-carousel
      color="white"
      quick-nav
      quick-nav-icon="favorite"
      infinite
      height="150px"
      autoplay
    >
      <q-carousel-slide img-src="http://47.106.222.50:8083/book/5b7a3b244e79406f8f2c8a03b1996a85.jpg" />
      <q-carousel-slide img-src="statics/parallax1.jpg" />
      <q-carousel-slide img-src="statics/parallax2.jpg" />
      <q-carousel-control
        slot="control-button"
        slot-scope="carousel"
        position="bottom-right"
        :offset="[18, 100]"
      >
        <q-btn
          round dense
          color="blue"
          :icon="carousel.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="carousel.toggleFullscreen()"
        />
      </q-carousel-control>
    </q-carousel>
    <q-modal v-model="modal" maximized>
      <q-carousel
        color="white"
        arrows
        quick-nav
        class="text-white full-height"
      >
        <q-carousel-slide
          v-for="n in 7" :key="`full-${n}`"
          class="flex flex-center"
          :class="`bg-${colors[n % 5]}`"
        >
          <div class="q-display-3">Step {{ n }}</div>
        </q-carousel-slide>

        <q-carousel-control
          slot="control-full"
          slot-scope="carousel"
          position="bottom-right"
          :offset="[18, 22]"
        >
          <q-btn
            rounded push
            color="amber"
            icon="close"
            label="Close me"
            @click="modal = false"
          />
        </q-carousel-control>
      </q-carousel>
    </q-modal>
    <br>
    <div class="row justify-around">
      <div class="col-3">
        <img src="statics/boy-avatar.png" style="width: 80%" alt="">
      </div>
      <div class="col-5">
        <div class="q-title">
          <strong>图书名称</strong>
        </div>
        <div class="q-body-2">
          出版社：xxxxxx
        </div>
        <div class="q-caption">
          图书名称
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
          label="Text height: 10px"
        />
      </div>
    </div>
    <br>
    <p class="caption q-body-2" style="margin:0 15px">
      简介:Carousel with custom Quick Navigation and different type of slides content,
      including a vertical scrolling slide (third one).
    </p>
    <br>
    <q-tabs animated swipeable inverted color="secondary" align="justify">
      <q-tab default name="mails" slot="title" icon="mail" label="简要信息" />
      <q-tab name="alarms" slot="title" icon="alarm" label="商品描述" />
      <q-tab name="movies" slot="title" icon="movie" label="卖家信息" />

      <q-tab-pane name="mails">
        <p class="caption">
          Carousel with a model (<q-chip small color="primary">{{ slide }}</q-chip>)
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          Carousel with custom Quick Navigation and different type of slides content,
          including a vertical scrolling slide (third one).
        </p>
      </q-tab-pane>
      <q-tab-pane name="alarms">
        <p class="caption">
          Carousel with a model (<q-chip small color="primary">{{ slide }}</q-chip>)
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          <q-btn
            rounded
            color="primary"
            @click="slide = 1"
            icon="arrow_downward"
            label="Navigate to second slide"
            class="q-ml-sm"
          />
        </p>
      </q-tab-pane>
      <q-tab-pane name="movies">
        <p class="caption">
          Carousel with a model (<q-chip small color="primary">{{ slide }}</q-chip>)
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          Carousel with custom Quick Navigation and different type of slides content,
          including a vertical scrolling slide (third one).
        </p>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>

export default {
  data: () => ({
    slide: 0,
    autoplay: true,
    colors: [
      'primary',
      'secondary',
      'yellow',
      'red',
      'orange',
      'grey-2'
    ],
    modal: false,
    thumbnailsHorizontal: false
  })
}
</script>

<style lang="stylus">
  @import '~variables'

  .docs-carousel
    p.caption:not(:first-of-type)
      margin-top 38px
    .custom-caption
      text-align center
      padding 12px
      color $grey-4
      background rgba(0, 0, 0, .5)
</style>
