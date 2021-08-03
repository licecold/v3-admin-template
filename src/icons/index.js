import SvgIcon from '@/components/SvgIcon'// svg 

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

export default SvgIcon
