import './index.scss'
export default {
  name: 'PaginationTable',
  data() {
    return {
      tableData: [],
      searchMap: {
        option: {},
        value: {}
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(nv) {
        this.tableData = nv
      }
    }
  },
  props: {
    tableClass: {
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
  methods: {
    search(column) {
      const { property: prop, searchOption: FOPT } = column
      const searchType = FOPT ? FOPT.type : ''

      const { value: searchVal, option: searchOtp } = this.searchMap
      if (!Reflect.has(searchOtp, prop)) searchOtp[prop] = {}
      searchOtp[prop].type = searchType
      this.tableData = this.data.map(v => Object.assign({}, v))

      Object.entries(searchVal).forEach(([field, value]) => {
        const type = searchOtp[field].type || 'match'
        const func = this[`filterBy${type}`]
        this.tableData = this.tableData.filter(item => func(value, item[field]))
      })
    },
    searchReset(column) {
      this.$delete(this.searchMap.value, column.property)
      this.search(column)
    },
    filterBymatch(value, match) {
      return new RegExp(value).test(match)
    },
    filterBykeyword(value, match) {
      return value.split('').every(v => new RegExp(v).test(match))
    },
    createTip(h) {
      if (this.showTotal) {
        return h(
          'p',
          {
            class: 'hoc-table-tip'
          },
          ['共搜索到 ', h('span', {}, this.pagination?.total || 0), ' 条数据']
        )
      } else {
        return ''
      }
    },
    createTable(h) {
      return h(
        'el-table',
        {
          ref: 'table',
          props: {
            'tooltip-effect': 'light',
            ...this.$attrs,
            data: this.tableData
          },
          class: this.tableClass,
          on: this.$props.tableEvents,
          scopedSlots: this.$scopedSlots
        },
        this.$props.columns.map((columnProps, $index) => {
          const key = columnProps.key || columnProps.prop || $index
          const { search } = columnProps

          if (search) {
            columnProps['render-header'] = this.renderFilterHeader
          }
          const emptyFormatter = (row, column, cellValue, index) => {
            return !cellValue && cellValue !== 0 ? '--' : cellValue
          }
          if (!Reflect.has(columnProps, 'formatter')) { columnProps.formatter = emptyFormatter }
          return h('el-table-column', {
            props: columnProps,
            on: this.$props.tableColumnEvents,
            scopedSlots: columnProps.render,
            key
          })
        })
      )
    },
    createPagination(h) {
      if (this.hidePagination || !this.$props.pagination) return
      const pagination = this.$props.pagination
      pagination['current-page'] =
        pagination['current-page'] || pagination.pageNum || pagination.pageNo
      return h(
        'div',
        {
          class: 'mt-20',
          style: 'text-align:right;'
        },
        [
          h('el-pagination', {
            props: {
              small: false,
              background: true,
              layout: 'total, prev, pager, next',
              ...this.$props.pagination
            },
            on: {
              'update:currentPage': (val) => this.$emit('update:pagination', {...pagination, 'current-page': val}),
              ...this.$props.paginaionEvents
            }
          })
        ]
      )
    },
    renderFilterHeader(h, { column, $index }) {
      const { label, property } = column
      if (!Reflect.has(this.searchMap.value, property)) { this.$set(this.searchMap.value, property, '') }
      return h('p', {}, [
        label,
        h(
          'el-popover',
          {
            props: {
              placement: 'top',
              width: '120',
              trigger: 'click'
            }
          },
          [
            h('div', {}, [
              h('el-input', {
                attrs: {
                  value: this.searchMap.value[property]
                },
                props: {
                  size: 'mini'
                },
                on: {
                  input: val => {
                    this.searchMap.value[property] = val
                    window.event.target.value = val
                  },
                  'keydown:native:enter': () => this.search(column)
                },
                nativeOn: {
                  keydown: event => {
                    if (event.keyCode !== 13) return
                    this.search(column)
                  }
                },
                style: 'width: 100%'
              }),
              h(
                'div',
                {
                  style:
                    'display:flex;margin-top: 10px;justify-content: space-between;'
                },
                [
                  h(
                    'el-button',
                    {
                      props: {
                        size: 'mini',
                        type: 'primary'
                      },
                      on: {
                        click: () => this.search(column)
                      }
                    },
                    ['搜 索']
                  ),
                  h(
                    'el-button',
                    {
                      props: {
                        size: 'mini'
                      },
                      on: {
                        click: () => this.searchReset(column)
                      }
                    },
                    ['重 置']
                  )
                ]
              )
            ]),
            h('a', {
              slot: 'reference',
              class: 'el-icon-search',
              style: 'color: #33C0CD;margin-left: 5px;'
            })
          ]
        )
      ])
    }
  },
  render(h) {
    return h('div', {}, [
      this.createTip(h),
      this.createTable(h),
      this.createPagination(h)
    ])
  }
}
