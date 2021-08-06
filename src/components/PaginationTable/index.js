import { h, watch, computed } from 'vue'

export default {
  name: 'PaginationTable',
  props: {
    tableClass: {
      type: String,
      default: ''
    },
    paginaionClass: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    hidePagination: {
      type: Boolean,
      default: false
    },
    paginaionEvents: {
      type: Object,
      default() {
        return {}
      }
    },
    tableEvents: {
      type: Object,
      default() {
        return {}
      }
    },
    tableColumnEvents: {
      type: Object,
      default() {
        return {}
      }
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    function createTip() {
      if (props.showTotal) {
        return h(
          'p',
          {
            class: 'hoc-table-tip'
          },
          ['共搜索到 ', h('span', {}, props.pagination?.total || 0), ' 条数据']
        )
      } else {
        return null
      }
    }
    function createTable() {
      return h(
        'el-table',
        {
          ref: 'table',
          props: {
            'tooltip-effect': 'light',
            ...this.$attrs,
            data: props.tableData
          },
          class: props.tableClass,
          on: this.$props.tableEvents,
          scopedSlots: this.$scopedSlots
        },
        props.columns.map((columnProps, $index) => {
          const key = columnProps.key || columnProps.prop || $index
          const { search } = columnProps

          if (search) {
            columnProps['render-header'] = this.renderFilterHeader
          }
          const emptyFormatter = (row, column, cellValue, index) => {
            return !cellValue && cellValue !== 0 ? '--' : cellValue
          }
          if (!Reflect.has(columnProps, 'formatter')) {
            columnProps.formatter = emptyFormatter
          }
          return h('el-table-column', {
            props: columnProps,
            on: props.tableColumnEvents,
            scopedSlots: columnProps.render,
            key
          })
        })
      )
    }
    function createPagination() {}
    return () => h('div', {}, [createTip(), createTable(), createPagination()])
  }
}
