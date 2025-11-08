// import vueEslintParser from 'vue-eslint-parser'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    rules: {
      'vue/no-v-html': 'off',
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
          importAttributes: 'always-multiline',
          dynamicImports: 'never',
        },
      ],
      '@stylistic/quote-props': ['warn', 'as-needed'],
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
])
