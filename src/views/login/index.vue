<script>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import encrypt from '@/utils/encrypt'
export default {
  name: 'Login',
  setup(props, context) {
    const $store = useStore()
    const $route = useRoute()
    const $router = useRouter()
    const loading = ref(false)
    const formRef = ref(null)
    const form = reactive({
      account: '',
      password: ''
    })
    const redirect = computed(() => $route.query?.redirect || '')
    const query = computed(() =>
      Object.keys($route.query).reduce((prev, curr) => {
        if (curr !== 'redirect') prev[curr] = $route.query[curr]
      }, {})
    )
    const rules = reactive({
      account: [
        { required: true, message: '请输入用户名/账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ]
    })
    const onSubmit = () => {
      loading.value = true
      const params = {
        account: form.account,
        password: encrypt(form.password)
      }
      formRef.value.validate(valid => {
        $store
          .dispatch('user/login', params)
          .then(() => {
            console.log(redirect)
            console.log(query)
            debugger
            // $router.push({
            //   path: redirect || '/',
            //   query
            // })
          })
          .finally(() => {
            loading.value = false
          })
      })
    }
    return {
      loading,
      form,
      formRef,
      rules,
      onSubmit
    }
  },
  render() {
    return (
      <div class='form-wrap'>
        <el-form
          ref='formRef'
          model={this.form}
          rules={this.rules}
          label-position='top'
        >
          <el-form-item prop='account' label='用户民/账号'>
            <el-input vModel_trim={this.form.account} />
          </el-form-item>
          <el-form-item prop='password' label='密码'>
            <el-input vModel_trim={this.form.password} type='password' />
          </el-form-item>
          <el-form-item>
            <el-button
              loading={this.loading}
              native-type='submit'
              type='primary'
              onClick={this.onSubmit}
            >
              {this.loading ? '登录中' : '登录'}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.form-wrap {
  width: 300px;
  margin: 10vh auto 0;
}
</style>
