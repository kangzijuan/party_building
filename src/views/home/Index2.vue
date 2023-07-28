<template>
	<screen-adater>
		<div class="home">
			<!--  顶部内容-->
			<div class="top-box">
				<!--顶部左侧内容-->
				<div class="t-left">
					<span class="t-left-title">百千万工程数据可视化驾驶舱123</span>
					<span class="t-left-subtext">王店镇 南梅村</span>
				</div>
				<!--顶部右侧内容-->
				<div class="t-right">
					<span class="datetime">{{ currDateTime }}</span>
					<img src="@/assets/images/go-system.png" />
					<span class="go-system">
						<span>进入后台</span>
					</span>
				</div>
			</div>
			<!--  左侧内容-->
			<div class="left-box">
				<div class="left-1">
					<div class="img-box">
						<a-carousel autoplay :dots="false">
							<div v-for="(item, index) in photos" :key="'image' + index">
								<img :src="item" />
							</div>
						</a-carousel>
					</div>
					<div class="type-box">
						<img src="@/assets/images/left-right-1.png" />
						<img src="@/assets/images/left-right-2.png" />
						<img src="@/assets/images/left-right-3.png" />
					</div>
				</div>
				<div class="left-2">
					<div class="left-2-item">
						<div class="value">{{ ruralInfo?.committeeManNumber }} / {{ ruralInfo?.committeeWomanNumber }}</div>
						<div class="text">班子/后备</div>
					</div>
					<div class="left-2-item">
						<div class="value">{{ ruralInfo?.populationNumber }}</div>
						<div class="text">总人口</div>
					</div>
					<div class="left-2-item">
						<div class="value">{{ ruralInfo?.floatingPopulationNumber }}</div>
						<div class="text">流动人口</div>
					</div>
				</div>
				<div class="common-title">党组织情况</div>
				<div class="echarts-box">
					<Echarts v-if="pieOptions" :key="pieOptions" :id="'pie'" :width="'100%'" :options="pieOptions" :height="'100%'" />
				</div>
				<div class="tab-box">
					<ul>
						<li v-for="(item, index) in tabList" :key="item.typeName" :class="{ active: currTabIndex === index }" @click="onTabChange(index)">
							<img :src="item.icon" alt="" />
							<span>{{ item.typeName }}</span>
						</li>
					</ul>
				</div>
				<div class="echarts-box2">
					<!-- -->
					<!--<Echarts :id="'dashboard'" :width="'100%'" :options="dashboardOptions" :height="'100%'" />-->
				</div>
			</div>
			<!--  右侧内容-->
			<div class="right-box">
				<div class="common-title">连心服务</div>
				<div class="common-title">集体经济</div>
				<div class="echarts-box">
					<Echarts v-if="barOptions" :id="'bar'" :width="'100%'" :options="barOptions" :height="'100%'" />
				</div>
				<div class="common-title">党组织活动</div>
			</div>
			<!--  底部内容-->
			<div class="bottom-box"></div>
			<!--  地图-->
			<echart-map />
		</div>
	</screen-adater>
</template>
<script lang="ts" setup>
import ScreenAdater from '@/components/ScreenAdater.vue'
import Echarts from '@/components/Echarts.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { formatByDate } from '../../utils/datetime-util'
import { COUNTRY_WEEK } from '../../enum/date'
import icon1 from '../../assets/images/left-right-1.png'
import icon2 from '../../assets/images/left-right-2.png'
import icon3 from '../../assets/images/left-right-3.png'
import tabIcon1 from '../../assets/images/21341633685714_.pic@2x.png'
import tabIcon2 from '../../assets/images/21351633685776_.pic@2x.png'
import tabIcon3 from '../../assets/images/21361633685858_.pic@2x.png'
import tabIcon4 from '../../assets/images/21371633685909_.pic@2x.png'
import tabIcon5 from '../../assets/images/21381633685967_.pic@2x.png'
import tabIcon6 from '../../assets/images/21391633686010_.pic@2x.png'
import { setPieOption, setDashboardOptions, setBarOptions } from '@/views/home/options2'
import EchartMap from '@/components/EchartsMap2.vue'
import requestMethod from '@/api/login'
import { useSystemStore } from '@/store/system'
import { useUserStore } from '@/store/user'
import { messageMethod } from '@/utils/message-util'
import ruralInfoRequest from '@/api/ruralInfo'
import { RuralInfoVo } from '@/entity/ruralInfo/ruralInfo'
import { BaseUtil } from '@/utils/base-util'
import ruralIndexRequest from '@/api/ruralIndex'
import { PersonnelDistributeVo } from '@/entity/ruralIndex/ruralIndex'
// 当前日期时间
const currDateTime = ref('')
// 时间定时器
const currTimeInte = ref()
// 轮播图片数组
const photos = ref<string[]>([])
// 党组织情况options
let pieOptions = ref({})
// 党组织情况分类options
let dashboardOptions = setDashboardOptions(0)
// 集体经济options
const barOptions = ref({})
// 当前选中tab的小标
const currTabIndex = ref(0)
// tab数据
const tabList = ref<PersonnelDistributeVo[]>([])
const loginParams = {
	userAccount: 'admin',
	password: '111111'
}
let requestId = 0
// 动画事件
const requestAnimation = (angle: number) => {
	cancelAnimationFrame(requestId)
	angle += 1
	dashboardOptions = setDashboardOptions(angle)
	requestId = requestAnimationFrame(() => {
		requestAnimation(angle)
	})
}
requestAnimation(0)
onMounted(async () => {
	// 获取当前的日期和时间以及星期
	const week = COUNTRY_WEEK.CN[formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').week]
	currTimeInte.value = setInterval(() => {
		let datetime = formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').text
		currDateTime.value = datetime + week
	}, 1000)
	console.log(document.getElementById('dashboard'))
	// requestAnimation(0)
	await login()
	await getRuralInfo()
	await getPersonnelDistribute()
	await getCollectiveEconomy()
	// await getDashboard()
})
// 使用系统存储
const systemStore = useSystemStore()
// 使用用户信息存储
const userStore = useUserStore()
// 登录请求
const login = async () => {
	await requestMethod.login(loginParams).then(({ data }) => {
		console.log(data)
		// 设置系统信息存储
		systemStore.setToken(data.authToken)
		// 设置用户信息存储
		userStore.setInfo(data)
		messageMethod.success('登录成功！')
	})
}
// 农村详情信息
const ruralInfo = ref<RuralInfoVo>()
// 农村id
const fkRuralId = ref<string | undefined>('')
const getRuralInfo = async () => {
	await ruralInfoRequest.page({ pageNum: 1, pageSize: 10, rfRuralName: '测试村' }).then(({ data }) => {
		console.log(data.list[0])
		ruralInfo.value = data.list[0]
		fkRuralId.value = ruralInfo.value?.fkRuralId
		const photosList: string[] =
			ruralInfo.value?.groupPhoto === ''
				? ruralInfo.value?.centerPhoto.split(',')
				: ruralInfo.value?.groupPhoto.split(',').concat(ruralInfo.value?.centerPhoto.split(','))
		photos.value = photosList.map(item => BaseUtil.getUploadPath(item))
	})
}
/**
 * 获取党员分布情况
 */
const getPersonnelDistribute = async () => {
	await ruralIndexRequest.personnelDistribute(fkRuralId.value).then(({ data }) => {
		console.log(data)
		const icons = [tabIcon1, tabIcon4, tabIcon3, tabIcon5, tabIcon2, tabIcon6]
		tabList.value = data
		tabList.value.forEach((item: PersonnelDistributeVo, index: number) => {
			item.icon = icons[index]
		})
		const chartsData = tabList.value[currTabIndex.value].distributeList.map(item => {
			return {
				name: item.distributionIntervalName,
				value: item.distributionNumber
			}
		})
		pieOptions.value = setPieOption(chartsData)
	})
}
/**
 * 获取集体经济数据
 */
const getCollectiveEconomy = async () => {
	await ruralIndexRequest.collectiveEconomy(fkRuralId.value).then(({ data }) => {
		console.log(data)
		const statisticsYear = data.map(item => item.statisticsYear)
		const operatingIncome = data.map(item => item.operatingIncome)
		const recurringIncome = data.map(item => item.recurringIncome)
		const operatingAverageIncome = data.map(item => item.operatingAverageIncome)
		const recurringAverageIncome = data.map(item => item.recurringAverageIncome)
		barOptions.value = setBarOptions({
			xAxisData: statisticsYear,
			legendData: ['经营性收入', '经常性收入', '全区平均'],
			seriesData: [operatingIncome, operatingAverageIncome, recurringIncome, recurringAverageIncome]
		})
	})
}
// watch(
// 	() => dashboardOptions.value,
// 	newVal => {
// 		console.log(newVal)
// 	},
// 	{
// 		deep: true
// 	}
// )
/**
 * 获取党员活动参与率数据
 */
async function getDashboard() {
	dashboardOptions = setDashboardOptions(0)
	// setTimeout(() => {
	requestAnimation(0)
	// }, 1000)
}

/**
 * 点击tab切换
 * @param index
 */
function onTabChange(index: number) {
	currTabIndex.value = index
	if (currTabIndex.value != undefined) {
		const chartsData = tabList.value[currTabIndex.value].distributeList.map(item => {
			return {
				name: item.distributionIntervalName,
				value: item.distributionNumber
			}
		})
		pieOptions.value = setPieOption(chartsData)
	}
}
// 组件卸载完成后执行的函数
onUnmounted(() => {
	cancelAnimationFrame(requestId)
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
$boxBgColor: rgba(0, 0, 0, 0.08);
$valueColors: #43b9fe #f8af3c #51ffc1;
.common-title {
	@include wh(228px, 52px);
	background: url('@/assets/images/t_bg.png') no-repeat;
	background-size: 100% 100%;
	text-align: center;
	line-height: 52px;
	@include fontMixin(24px, 400, #c7e6ff);
	letter-spacing: 2px;
}
.home {
	@include wh(100%, 100%);
	background: url('@/assets/images/bg.png') no-repeat;
	background-size: 100% 100%;
	color: #fff;
	.top-box {
		position: absolute;
		width: 100%;
		@include flexMixin(space-between, center);
		padding: 43px 23px 24px 53px;
		.t-left {
			.t-left-title {
				@include fontMixin(48px, 700);
				margin-right: 22px;
				letter-spacing: 6px;
			}
			.t-left-subtext {
				@include fontMixin(28px, 700);
				letter-spacing: 2px;
			}
		}
		.t-right {
			display: flex;
			align-items: center;
			.datetime {
				@include fontMixin(18px, 500);
			}
			img {
				@include wh(36px, 36px);
				margin: 0 7px 0 18px;
			}
			.go-system {
				@include fontMixin(21px, 700);
				&:after {
					content: '';
					display: inline-block;
					@include wh(11px, 12px);
					background: url('@/assets/images/arrow-right.png') no-repeat;
					background-size: 100% 100%;
					margin-left: 2px;
				}
			}
		}
	}
	.left-box,
	.right-box {
		@include wh(447px, 930px);
		border: 1px solid red;
		position: absolute;
		top: 113px;
		background-color: $boxBgColor;
		padding: 12px 13px;
		z-index: 2;
	}
	.left-box {
		left: 37px;
		.left-1 {
			.img-box {
				@include wh(319px, 186px);
				padding: 12px 11px;
				vertical-align: middle;
				display: inline-block;
				border: 1px solid #cbedff;
				background-color: rgba(0, 0, 0, 0.2);
				:deep(.ant-carousel) {
					.slick-slide img {
						@include wh(297px, 162px);
					}
				}
			}
			.type-box {
				margin-left: 20px;
				display: inline-block;
				vertical-align: middle;
				& > img {
					@include wh(63px, 46px);
					margin-bottom: 19px;
					display: block;
				}
				img:last-child {
					margin-bottom: 0;
				}
			}
		}
		.left-2 {
			@include flexMixin(space-around, center);
			margin: 49px 0;
			@each $color in $valueColors {
				$index: index($valueColors, $color);
				div:nth-child(#{$index}) {
					.value {
						@include fontMixin(40px, 400, $color);
						font-family: DS-DIGF;
						letter-spacing: 4px;
						line-height: 40px;
					}
					.text {
						font-size: 14px;
					}
				}
			}
		}
		.echarts-box {
			@include wh(100%, 247px);
		}
		.tab-box {
			width: 100%;
			ul {
				margin: 0;
				padding: 0;
				text-align: center;
				& > li {
					margin-left: -1px;
				}
				& > li:first-child {
					margin-left: 0;
				}
				li {
					display: inline-block;
					border: 1px solid #42b9fe;
					cursor: pointer;
					padding: 6px 9px;
					img,
					span {
						vertical-align: middle;
					}
					img {
						margin-right: 2px;
					}
				}
				.active {
					background-color: #11d290;
					border: 1px solid #11d290;
					color: #fff;
				}
			}
		}
		.echarts-box2 {
			@include wh(100%, 260px);
		}
	}
	.right-box {
		right: 37px;
		.echarts-box {
			@include wh(100%, 255px);
		}
	}
	-bottom-box {
		@include wh(905px, 327px);
		position: absolute;
		top: 717px;
		left: 0;
		right: 0;
		margin: 0 auto;
		background-color: $boxBgColor;
	}
}
</style>
