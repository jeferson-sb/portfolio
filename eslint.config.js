import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      ...eslintConfigPrettier.rules,
    }
  }
]