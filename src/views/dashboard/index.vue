<script>
export default {
  name: 'Dashboard',
  setup() {
    const handleCommand = () => {}

    return () => (
      <div>
        <el-dropdown
          onCommand={handleCommand}
          trigger='click'
          v-slots={{
            default: () => (
              <span class='el-dropdown-link'>
                下拉菜单<i class='el-icon-arrow-down el-icon--right'></i>
              </span>
            ),
            dropdown: () => {
              debugger
              return (
                <el-dropdown-menu>
                  <el-dropdown-item command='a'>黄金糕</el-dropdown-item>
                  <el-dropdown-item command='b'>狮子头</el-dropdown-item>
                  <el-dropdown-item command='c'>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item command='d' disabled>
                    双皮奶
                  </el-dropdown-item>
                  <el-dropdown-item command='e' divided>
                    蚵仔煎
                  </el-dropdown-item>
                </el-dropdown-menu>
              )
            }
          }}
        ></el-dropdown>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
