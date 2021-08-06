<script>
import { RouterView, useRoute } from 'vue-router'
import { Transition, KeepAlive, computed, ref, reactive } from 'vue'
export default {
  name: 'AppMain',
  setup() {
    const $route = useRoute()
    const key = computed(() => $route.path)
    const slots = ref(null)
    // TODO: 通过asyncRoutes 获取对应缓存路由
    const cacheList = reactive([])
    return {
      key,
      slots,
      cacheList
    }
  },
  render() {
    return (
      <section class='app-main'>
        <RouterView
          key={this.key}
          v-slots={{
            default: ({ Component }) => (
              <Transition>
                <KeepAlive include={this.cacheList}>
                  <Component />
                </KeepAlive>
              </Transition>
            )
          }}
        ></RouterView>
      </section>
    )
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
