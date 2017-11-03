var nodeConsole = require('console')
var log = new nodeConsole.Console(process.stdout, process.stderr).log
var fs = require('fs')
const handleBars = require('handlebars')
const { shell } = require('electron')
const { dialog } = require('electron').remote
const { exec } = require('child_process')
const { asyncFunc } = require('@/util/base.js')
const cloneUrl = ''

const iAsyncFunc = asyncFunc(err => {
  console.log(`统一错误处理：${err}`)
})
const iExec = (str) => {
  return new Promise((resolve, reject) => {
    exec(str, (error, stdout, stderr) => {
      if (error) {
        log(error)
        reject(new Error('执行 git config 出错: ' + error))
        return
      }
      log(stdout)
      resolve(stdout.replace(/[\r\n]/g, ''))
    })
  })
}

const state = {
  projDir: '/Users/didi/test',
  formData: {}
}
const getters = {
  projDir: state => state.projDir
}

const mutations = {
  SET_PROJDIR (state, { projDir }) {
    state.projDir = projDir[0]
  },
  OPEN_FOLDER (state) {
    shell.showItemInFolder(state.projDir)
  },
  SET_FORMDATA (state, { formData }) {
    state.formData = formData
  }
}

const actions = {
  openFolder ({ commit }) {
    commit('OPEN_FOLDER')
  },
  setDirAndClone ({ commit, state }, { formData }) {
    commit('SET_PROJDIR', { projDir: dialog.showOpenDialog({
      title: '选择工程保存目录',
      properties: ['openDirectory', 'createDirectory']
    }) })
    if (state.projDir) {
      exec('git clone ' + cloneUrl, { cwd: state.projDir }, (error, stdout, stderr) => {
        if (error) {
          log(error)
          return
        }
        log(stdout)
        commit('SET_FORMDATA', { formData })
      })
    }
  },
  setFormData ({ commit }, { formData }) {
    commit('SET_FORMDATA', { formData })
  },
  // 读文件
  readFile ({ commit, state }, fileDir) {
    const { projDir } = state
    const fPath = `${projDir}/vue-startkit/${fileDir}`
    return new Promise((resolve, reject) => {
      fs.readFile(fPath, 'utf8', (err, data) => {
        if (err) {
          log(err)
          reject(err)
        }
        resolve(data)
      })
    })
  },
  configPackageJson ({ commit }, { data }) {
    const { dependencies } = data
    delete dependencies.vuex
  },
  // 写文件
  writeFile ({ commit, dispatch }, { convertData, fileDir }) {
    const { projDir } = state
    // const packageJson = `${projDir}/vue-startkit/${fileDir}`
    const filePath = `${projDir}/vue-startkit/package1.json`
    let jsonData
    try {
      jsonData = JSON.parse(convertData)
      if (fileDir === 'package.json') {
        dispatch('configPackageJson', { data: jsonData })
      }
    } catch (e) {
      console.log(e)
    }
    if (jsonData) {
      const { dependencies } = jsonData
      delete dependencies.vuex
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
          reject(err)
        }
        resolve('======== success ! =========')
      })
    })
  },
  // 文本转换
  convertData ({ commit }, payload) {
    const { context, data, userInfo } = payload
    Object.assign(context, userInfo)
    const template = handleBars.compile(data)
    return template(context)
  },
  async configFile ({ commit, dispatch }, payload) {
    const { fileDir, context } = payload
    const asyncReadFile = iAsyncFunc(dispatch, 'readFile')
    const asyncWriteFile = iAsyncFunc(dispatch, 'writeFile')
    const asyncConvData = iAsyncFunc(dispatch, 'convertData')
    const asyncUserInfo = iAsyncFunc(dispatch, 'getUserInfo')
    const userInfo = await asyncUserInfo()
    const fData = await asyncReadFile(fileDir)
    const convertData = await asyncConvData({ context, data: fData, userInfo })
    const result = await asyncWriteFile({ convertData, fileDir })
    console.log(result)
  },
  async getUserInfo ({ commit }) {
    const author = await iExec('git config user.name')
    const email = await iExec('git config user.email')
    return {
      author,
      email
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
