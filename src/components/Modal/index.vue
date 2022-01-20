<template>
  <div class="modal__overlay" :class="isShow ? 'show' : ''">
    <button class="modal__close" @click="close">
      <img src="@/assets/close.svg" alt="" />
    </button>
    <div class="modal">
      <div v-if="content.type === 'image'" class="modal_image">
        <img :src="`./images/${content.url}`" :alt="content.caption" />
        <div class="modal__caption">{{ content.caption }}</div>
      </div>
      <div v-if="content.type === 'video'" class="modal_video">
        <div v-if="isLoading" class="isLoading">
          <Indicator />
        </div>
        <video
          id="modalVideo"
          autoplay
          :src="content.url"
          :alt="content.caption"
        />
        <div class="modal__caption">{{ content.caption }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Indicator from "../Indicator/index.vue";

  const videoLoader = (callback) => {
    const video = document.getElementById("modalVideo");
    video.addEventListener(
      "canplay",
      () => {
        callback();
      },
      false
    );
  };

  export const ModalController = () => {
    let callbacks = [];
    const setCallback = (c) => {
      callbacks.push(c);
    };
    const show = (content) => {
      callbacks.forEach((callback) => {
        callback(true, content);
      });
    };
    const close = () => {
      callbacks.forEach((callback) => {
        callback(false, null);
      });
    };
    return {
      show,
      close,
      setCallback,
    };
  };

  export const modal = ModalController();

  export default {
    name: "Modal",
    data: () => {
      return {
        content: {
          url: null,
          caption: null,
          type: null,
        },
        isShow: false,
        isLoading: false,
      };
    },
    components: { Indicator },
    mounted() {
      modal.setCallback((result, content) => {
        this.isShow = result;
        if (content) this.setContent(content);
      });
    },
    methods: {
      setContent(v) {
        this.content = {
          url: v.src_url,
          caption: v.caption,
          type: v.type,
        };
        this.$nextTick(() => {
          if (v.type === "video") {
            this.isLoading = true;
            videoLoader(() => {
              this.isLoading = false;
            });
          }
        });
      },
      close() {
        this.isShow = false;
        (this.content = {
          url: null,
          caption: null,
          type: null,
        }),
          modal.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal__overlay {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s ease-out;
    .modal {
      display: none;
    }

    &.show {
      opacity: 1;
      z-index: 10;
      pointer-events: all;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1;
      }
      .modal {
        position: relative;
        display: block;
        z-index: 2;
      }
    }
  }

  .modal {
    width: 80%;
    height: 80%;
    text-align: center;
    background: black;
  }

  .modal__close {
    background: none;
    position: absolute;
    border: none;
    top: 8px;
    right: 8px;
    width: 48px;
    height: 48px;
    z-index: 12;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .modal__caption {
    font-size: 12px;
    color: white;
    text-align: center;
    padding: 8px 0;
  }

  .modal_image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 90%;
    }
  }

  .modal_video {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    video {
      width: 100%;
    }
  }

  .isLoading {
    color: white;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
  }
</style>
