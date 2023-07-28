<template>
	<div id="container" ref="container"></div>
</template>
<script lang="ts" setup>
// 获取地图容器
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import mapJson from './map.json'
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes'
import { Region } from '@/entity/map'
import map1 from '@/assets/images/map6.png'
import map2 from '@/assets/images/map7.png'
import map3 from '@/assets/images/map8.png'
import scatter1 from '@/assets/images/01.png'
import scatter2 from '@/assets/images/02.png'
import scatter3 from '@/assets/images/03.png'
import kuan from '@/assets/images/kuang.png'
type EChartsType = echarts.EChartsType
const container = ref<HTMLElement>()
let myCharts: EChartsType | null = null
const regionsData: Array<Region> = []
//点阵数组
const images = [map1, map2, map3]
//涟漪背景
const scatterImg = ['image://' + scatter1, 'image://' + scatter2, 'image://' + scatter3]

onMounted(() => {
	initMap()
})
const initMap = () => {
	if (container.value) {
		//echarts初始化
		myCharts = echarts.init(container.value)
		//显示加载动画效果，可以在加载数据前手动调用该接口显示加载风华
		//在数据加载完成后调用hideLoading隐藏加载动画
		myCharts.showLoading('default', {
			text: '统计中，请稍后...',
			maskColor: '#2957a2',
			textColor: '#fff'
		})
		//  echarts注册地图
		console.log(mapJson.data)
		echarts.registerMap('jiaxing', mapJson.data as GeoJSONSourceInput)
		//隐藏加载动画效果
		myCharts.hideLoading()
		//  初始化数据
		setOption()
		//  echarts地图适配
		window.addEventListener('resize', handlerResize)
	}
}
//reduce先传入[ ] 空数组,
// 通过迭代过程,对目标数组进行遍历,
// 判断当前元素是否已经添加到空数组中,
// 如果没有就从尾部追加到空数组中
const setOption = () => {
	if (mapJson) {
		mapJson.data.features.forEach(item => {
			const { name, CENTERX, CENTERY, gridLevel, partyMemberNumber, registeredPopulationNumber } = item.properties
			regionsData.push({
				name: name,
				gridLevel: gridLevel,
				itemStyle: {
					areaColor: {
						image: images[gridLevel - 1],
						repeat: 'repeat'
					},
					borderColor: '#3de0fa',
					borderWidth: 2
				}
			})
		})
	}
	const option = {
		geo: [
			{
				map: 'jiaxing',
				aspectScale: 1,
				layoutCenter: ['52.05%', '40%'],
				layoutSize: '70%',
				z: 1,
				itemStyle: {
					//地图区域的颜色。
					areaColor: 'rgba(36, 78, 125, 1)',
					//图形的描边颜色
					borderColor: 'rgba(25, 50, 86, 0.5)',
					//描边线宽
					borderWidth: 5
				},
				emphasis: {
					disabled: true,
					// itemStyle: {
					// 	areaColor: 'rgba(25, 50, 88, 1)'
					// },
					label: {
						show: false
					}
				}
			},
			{
				map: 'jiaxing',
				aspectScale: 1,
				layoutCenter: ['51.1%', '40.2%'],
				layoutSize: '70%',
				z: 2,
				itemStyle: {
					borderColor: 'rgba(25, 50, 86, 0.5)',
					borderWidth: 5,
					areaColor: 'rgba(36, 78, 125, 1)'
				},
				emphasis: {
					disabled: true,
					// itemStyle: {
					// 	areaColor: 'rgba(25, 50, 88, 1)'
					// },
					label: {
						show: false
					}
				}
			},
			{
				map: 'jiaxing',
				aspectScale: 1,
				layoutCenter: ['50.5%', '40.4%'],
				layoutSize: '70%',
				z: 3,
				itemStyle: {
					borderColor: 'rgba(25, 50, 86, 0.5)',
					borderWidth: 5,
					areaColor: 'rgba(36, 78, 125, 1)'
				},
				emphasis: {
					disabled: true,
					label: {
						show: false
					}
				}
			},
			{
				map: 'jiaxing',
				aspectScale: 1,
				layoutCenter: ['50%', '40%'],
				layoutSize: '69.2%',
				z: 4,
				regions: regionsData,
				itemStyle: {
					shadowColor: '#4ABCFF',
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
					areaColor: {
						type: 'radial',
						x: 0.6,
						y: 0.6,
						r: 1.5,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(60, 194, 246, 0)' // 0% 处的颜色
							},
							{
								offset: 1,
								color: 'rgba(60, 194, 246, 1)' // 100% 处的颜色
							}
						],
						globalCoord: false // 缺省为 false
					}
				},
				emphasis: {
					disabled: true,
					// itemStyle: {
					// 	areaColor: 'rgba(25, 50, 88, 0)'
					// },
					label: {
						show: false
					}
				}
			},
			{
				map: 'jiaxing',
				aspectScale: 1,
				layoutCenter: ['50%', '40%'],
				layoutSize: '69.2%',
				z: 5,
				label: {
					show: true,
					color: '#fff',
					fontSize: 20
				},
				itemStyle: {
					borderColor: 'none',
					areaColor: {
						type: 'radial',
						x: 0.6,
						y: 0.6,
						r: 1.5,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(60, 194, 246, 0)' // 0% 处的颜色
							},
							{
								offset: 1,
								color: 'rgba(60, 194, 246, 1)' // 100% 处的颜色
							}
						]
						// globalCoord: false // 缺省为 false
					}
				},
				emphasis: {
					itemStyle: {
						areaColor: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 1.5,
							colorStops: [
								{
									offset: 0,
									color: 'rgba(95, 240, 210, 0)' // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(95, 240, 210, 1)' // 100% 处的颜色
								}
							],
							globalCoord: false // 缺省为 false
						}
					},
					label: {
						color: '#fff'
					}
				}
			}
		]
	}
	myCharts?.setOption(option)
}
const handlerResize = (option: any): void => {
	myCharts?.setOption(option)
	myCharts?.resize()
}
// dom即将销毁
onBeforeUnmount(() => {
	window.removeEventListener('resize', handlerResize)
	//  销毁图表
	myCharts?.dispose()
	myCharts = null
})
</script>
<style lang="scss" scoped>
#container {
	width: 100vw;
	height: 100%;
	position: absolute;
	z-index: 1;
}
</style>
