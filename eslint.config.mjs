import withNuxt from './.nuxt/eslint.config.mjs'
import tailwindPlugin from 'eslint-plugin-better-tailwindcss'
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults'
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types'

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
]).append({
  plugins: {
    'better-tailwindcss': tailwindPlugin,
  },

  rules: {
    ...tailwindPlugin.configs['recommended-warn'].rules,
  },

  settings: {
    'better-tailwindcss': {
      entryPoint: 'app/assets/css/main.css',
      selectors: [
        ...getDefaultSelectors(),
        {
          kind: SelectorKind.Callee,
          match: [
            {
              type: MatcherType.String,
            },
          ],
          name: '^mergeClasses$',
        },
      ],
    },
  },
})
