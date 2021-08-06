/*
 * @Author: liangb
 * @Date: 2020-06-03 11:08:20
 * @LastEditors: liangb
 * @LastEditTime: 2020-06-03 11:09:22
 * @Description: file content
 */

export default {
  methods: {},
  render(h) {
    return h('el-table-column', {
      props: this.$attrs,
      on: this.$listeners,
      scopedSlots: this.$scopedSlots
    })
  }
}
