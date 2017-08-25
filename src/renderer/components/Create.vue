<template lang="html">
  <div class="create-wrapper">
    <div class="cus-title">
      新建项目
    </div>
    <div class="create-container">
      <Row style="margin-top: 20px;">
        <Form ref="form" :model="formData" :label-width="120">
            <Form-item label="vue-startkit 版本：" prop="">
                <span>{{version}}</span>
            </Form-item>
            <Form-item label="多语言：" prop="">
              <div slot="label">
                  <span>多语言</span>
                  <Tooltip content="基于 vue-i18n">
                      <Icon type="ios-help" size="14" color="#3399ff"></Icon>
                  </Tooltip>
                  <span>：</span>
              </div>
              <i-switch v-model="formData.i18n">
                  <Icon type="android-done" slot="open"></Icon>
                  <Icon type="android-close" slot="close"></Icon>
              </i-switch>
            </Form-item>
            <Form-item label="状态管理：" prop="store">
                <Checkbox-group v-model="formData.store">
                    <Checkbox label="vuex"></Checkbox>
                    <Checkbox label="EventBus"></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="图表：" prop="chart">
                <Checkbox-group v-model="formData.chart">
                    <Checkbox label="echarts"></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="ESLint：" prop="eslint">
                <i-switch v-model="formData.eslint">
                    <Icon type="android-done" slot="open"></Icon>
                    <Icon type="android-close" slot="close"></Icon>
                </i-switch>
            </Form-item>
            <Form-item label="附加功能：" prop="funs">
                <Checkbox-group v-model="formData.funs">
                    <Checkbox label="cookies">Cookie（js-cookie）</Checkbox>
                    <Checkbox label="html2canvas">HTML 转图片（html2canvas）</Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="项目名称：" prop="name">
                <Input v-model="formData.name" placeholder="必须为英文且不带空格"></Input>
            </Form-item>
            <Form-item label="版本号：" prop="ver">
                <Input v-model="formData.ver" placeholder="请输入版本号，例如 1.0.0"></Input>
            </Form-item>
            <Form-item label="项目介绍：" prop="desc">
                <Input type="textarea" v-model="formData.desc" placeholder="请输入项目介绍..."></Input>
            </Form-item>
            <Form-item label="Git 地址：" prop="git">
                <Input v-model="formData.git" placeholder="请输入所在仓库地址"></Input>
            </Form-item>
            <Row type="flex" justify="center" style="margin-top: 20px;">
              <Col span="10">
                <Button type="primary" long @click.native="createProj">创建工程</Button>
              </Col>
              <Col span="10" offset="1">
                <Button type="ghost" long @click.native="resetForm">重置</Button>
              </Col>
            </Row>
        </Form>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: '0.1.4',
      formData: {

      }
    }
  },
  created () {

  },
  methods: {
    createProj () {
      console.log('createProject')
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less">
  .cus-title {
    height: 20px;
    text-align: center;
    -webkit-app-region: drag;
    padding: 4px 0 0;
    font-size: 14px;
    cursor: move;
  }
  .create-container {
    position: absolute;
    top: 20px;
    bottom: 15px;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: auto;
    padding: 0 10px;
  }
  .create-container .ivu-form-item{
      margin-bottom: 10px;
  }
</style>
