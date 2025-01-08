import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import oxlint from 'eslint-plugin-oxlint'

/** @type {import("eslint").Linter.Config[]} */
export default [
  { files: ['**/*.{js,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  oxlint.configs['flat/recommended'],
]
