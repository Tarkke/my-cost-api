export default {
  '*.ts': ['oxlint --fix', 'eslint --fix', 'prettier --write'],
  '*.json': 'prettier --write',
  '*.config.mjs': 'prettier --write',
}
