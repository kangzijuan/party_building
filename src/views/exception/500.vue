<template>
	<a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
		<template #extra>
			<a-button type="primary" @click="goHome">回到首页</a-button>
		</template>
	</a-result>
</template>
<script>
export default {
	name: '500',
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
