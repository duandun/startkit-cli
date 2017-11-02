
export function getFormData () {
  return {
    name: '',
    i18n: false,
    store: [],
    chart: false,
    eslint: false,
    ver: '',
    desc: '',
    git: ''
  }
}

export function getRules (context) {
  return {
    name: [
      { required: true, message: '请填写项目名称', trigger: 'change' }
    ],
    ver: [
      { required: true, message: '请填写版本号', trigger: 'change' }
    ]
  }
}
