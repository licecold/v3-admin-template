<template>
  <div class="mb-30">
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
      <transition name="sidebarLogoFade">
        <router-link
          v-if="collapse"
          key="collapse"
          class="collapse sidebar-logo-link"
          to="/"
        >
          <img v-if="logo" :src="logo" class="sidebar-logo">
        </router-link>
        <router-link
          v-else
          key="expand"
          class="expand sidebar-logo-link"
          to="/"
        >
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <span>规则引擎管理系统</span>
        </router-link>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '数据管理',
      logo: require('@/assets/logo/logo.png'),
      logo_pure: require('@/assets/logo/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    &.expand img {
      width: 32px;
    }
    &.expand span {
      font-family: AlibabaPuHuiTi-Medium;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      transform: translateY(14px);
      display: inline-block;
    }
    &.collapse img {
      width: 40px;
    }

    & .sidebar-logo {
      vertical-align: bottom;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: bottom;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

.sub-title > p {
  margin: 0;
  padding: 20px 0 10px 20px;
  opacity: 0.6;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #ffffff;
  line-height: 20px;
}
</style>
