const successMap = {
  code: [200, '200'],
  status: [0, 200, '200', '0']
}

const errorMap = {
  status: {
    403: '请开通权限',
    801: '请开通权限',
    4110006: '请开通权限'
  },
  code: {
    403: '请开通权限',
    801: '请开通权限',
    4110006: '请开通权限'
  }
}

export default { successMap, errorMap }
