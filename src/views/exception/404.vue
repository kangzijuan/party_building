<template>
	<a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
		<template #extra>
			<a-button type="primary" @click="goHome">回到首页</a-button>
		</template>
	</a-result>
</template>
<script>
export default {
	name: '404',
	data() {
		return {}
	},
	methods: {
		goHome() {
			this.$router.push('/')
		}
	}
}
</script>
