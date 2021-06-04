# vuex-plugins-load

A loading plugin like dva-loading

```
import createLoadingPlugin from 'vuex-plugins-load'

const store = new Vuex.Store({
  plugins: [createLoadingPlugin()]
})

computed: {
  ...mapState({
    loading: state => state.loading.effects['user/info'],
    loading2: state => state.loading.effects['namespace/actions'],
  }),
}

```
