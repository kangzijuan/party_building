<template>

	<a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
		<template #extra>
			<a-button type="primary" @click="goHome">回到首页</a-button>
		</template>
	</a-result>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goHome(){
      // 路由跳转
      this.$router.push('/')
    }
  }
}
</script>