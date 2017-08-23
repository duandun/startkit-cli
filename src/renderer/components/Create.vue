<template lang="html">
  <div class="create-container">
    新建项目
    <Row>
      <Button type="primary" @click="$router.go(-1)">返回</Button>
    </Row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .create-container {
    padding: 20px;
    text-align: center;
  }
</style>
