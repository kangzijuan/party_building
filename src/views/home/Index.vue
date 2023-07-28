<template>
	<screen-adater>
		<div class="home">
			<!--  顶部内容-->
			<div class="top-box">
				<!--顶部左侧内容-->
				<div class="t-left">
					<span class="t-left-title">百千万工程数据可视化驾驶舱</span>
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
						<div class="value">5 / 3</div>
						<div class="text">班子/后备</div>
					</div>
					<div class="left-2-item">
						<div class="value">5003</div>
						<div class="text">总人口</div>
					</div>
					<div class="left-2-item">
						<div class="value">2003</div>
						<div class="text">流动人口</div>
					</div>
				</div>
				<div class="common-title">党组织情况</div>
				<div class="echarts-box">
					<Echarts :id="'multiplePie'" :width="'100%'" :height="'100%'" :options="multiplePieOptions" />
				</div>
				<div class="tabs-box">
					<ul>
						<li v-for="(item, index) in tabList" :key="item.name" :class="{ active: tabIndex === index }" @click="onTabChange(index)">
							<img :src="item.icon" alt="" />
							<span>{{ item.name }}</span>
						</li>
					</ul>
				</div>
				<div class="echarts-box2">
					<!--<Echarts :id="'dashborad'" :width="'100%'" :height="'100%'" :options="dashboradOptions" />-->
					<div class="echarts-t">党员活动平均参与率</div>
				</div>
			</div>
			<!--  右侧内容-->
			<div class="right-box">
				<div class="common-title">连心服务</div>
				<div class="common-title">集体经济</div>
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
import { onMounted, ref } from 'vue'
import { formatByDate } from '@/utils/datetime-util'
import { COUNTRY_WEEK } from '@/enum/date'
import icon1 from '@/assets/images/left-right-1.png'
import icon2 from '@/assets/images/left-right-2.png'
import icon3 from '@/assets/images/left-right-3.png'

import tabIcon1 from '@/assets/images/21341633685714_.pic@2x.png'
import tabIcon2 from '@/assets/images/21351633685776_.pic@2x.png'
import tabIcon3 from '@/assets/images/21361633685858_.pic@2x.png'
import tabIcon4 from '@/assets/images/21371633685909_.pic@2x.png'
import tabIcon5 from '@/assets/images/21381633685967_.pic@2x.png'
import tabIcon6 from '@/assets/images/21391633686010_.pic@2x.png'
import { dashborad, multiplePie } from '@/views/home/options'
import EchartMap from '@/components/EchartMap.vue'
// 当前日期时间
const currDateTime = ref('')
// 时间定时器
const currTimeInte = ref()
// 轮播图片数组
const photos = ref<string[]>([icon1, icon2, icon3])
// tabs数据
const tabList = ref([
	{
		name: '学历',
		value: 0,
		icon: tabIcon1
	},
	{
		name: '职业',
		value: 1,
		icon: tabIcon2
	},
	{
		name: '年龄',
		value: 2,
		icon: tabIcon3
	},
	{
		name: '党龄',
		value: 3,
		icon: tabIcon4
	},
	{
		name: '性别',
		value: 4,
		icon: tabIcon5
	},
	{
		name: '发展党员',
		value: 5,
		icon: tabIcon6
	}
])
//tab默认下标
const tabIndex = ref(0)
const colorConfig = {
	fontColor: '#80E6FF',
	color: 'rgba(128, 230, 255, 1)',
	noColor: 'rgba(128, 230, 255, 0.15)',
	outerRing: 'rgba(128, 230, 255, 1)',
	innerRing: 'rgba(128, 230, 255, 0.5)',
	stroke: '#80E6FF'
}
// 党组织情况options
let multiplePieOptions = multiplePie()
let dashboradOptions = dashborad(colorConfig, 0)
onMounted(() => {
	// 获取当前的日期和时间以及星期
	const week = COUNTRY_WEEK.CN[formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').week]
	currTimeInte.value = setInterval(() => {
		let datetime = formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').text
		currDateTime.value = datetime + week
	}, 1000)
	// getPersonnelDistribute()
})
/**
 * 获取党组织情况数据
 */
function getPersonnelDistribute() {
	// multiplePieOptions.value = multiplePie()
}

function onTabChange(index: number) {
	tabIndex.value = index
}
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
		position: absolute;
		top: 113px;
		background-color: $boxBgColor;
		padding: 12px 13px;
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
		.tabs-box {
			width: 100%;
			ul {
				padding: 0;
				margin: 0;
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
					padding: 6px 9px;
					cursor: pointer;
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
			@include wh(100%, 224px);
			.echarts-t {
				@include fontMixin(18px, 700);
				text-align: center;
			}
		}
	}
	.right-box {
		right: 37px;
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
