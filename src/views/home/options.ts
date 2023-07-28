import * as echarts from '@/components/Echarts.vue'
type EchartsOptions = echarts.EchartsOption
/**
 * 多层圆环图
 */
//颜色16进制换算rgba,添加透明度
function hexToRgba(hex: string, opacity: number) {
	return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')'
}
export const multiplePie = () => {
	// 测试数据
	const pieChartData = [
		{
			name: '竞争性谈判',
			value: 30
		},
		{
			name: '公开招标',
			value: 50
		},
		{
			name: '询价',
			value: 80
		},
		{
			name: '单一来源',
			value: 90
		}
	]
	// 默认半径
	const radius = ['50%', '54%']
	// 颜色系列
	const color = ['#37FFC9', '#FFE777', '#19D6FF', '#32A1FF', '#cccccc', '#ff1111']
	const color1: string[] = [],
		color2: string[] = [],
		color3: string[] = []
	// 设置每层圆环颜色和添加间隔的透明色
	color.forEach(item => {
		color1.push(item, 'transparent')
		color2.push(hexToRgba(item, 0.7), 'transparent')
		color3.push(hexToRgba(item, 0.4), 'transparent')
	})
	const data1: EchartsOptions[] = []
	let sum = 0
	// 根据总值设置间隔值大小
	pieChartData.forEach(item => {
		sum += Number(item.value)
	})
	// 给每个数据后添加特定的透明的数据形成间隔
	pieChartData.forEach(item => {
		if (item.value !== 0) {
			data1.push(item, {
				name: '',
				value: sum / 70,
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			})
		}
	})
	// 每层圆环大小
	const radius2 = [Number(radius[1].split('%')[0]) + 0 + '%', Number(radius[1].split('%')[0]) + 4 + '%']
	const radius3 = [Number(radius[1].split('%')[0]) + 4 + '%', Number(radius[1].split('%')[0]) + 8 + '%']
	return {
		title: {
			text: 53,
			subtext: '党员数',
			x: 'center',
			y: '35.5%',
			itemGap: 5,
			textStyle: {
				color: '#fff',
				fontSize: 34,
				fontFamily: 'DS-DIGF'
			},
			subtextStyle: {
				color: '#42B9FE',
				fontSize: 12
			}
		},
		tooltip: {
			formatter: (params: { name: string; value: string; percent: string }) => {
				if (params.name != '') {
					return params.name + ':' + params.value + '<br />' + '(' + params.percent + '%)'
				}
			}
		},
		series: [
			{
				// 最外层圆环
				type: 'pie',
				radius: radius3,
				center: ['50%', '50%'],
				hoverAnimation: false,
				startAngle: 90,
				selectedMode: 'single',
				selectedOffset: 0,
				itemStyle: {
					color: (params: { dataIndex: number }) => {
						return color1[params.dataIndex]
					}
				},
				label: {
					show: true,
					position: 'outside',
					color: '#fff',
					lineHeight: 20,
					formatter: (params: { name: string; percent: string }) => {
						return `${params.name}\n${params.percent}%`
					}
				},
				labelLine: {
					show: true
				},
				data: data1,
				z: 666
			},
			{
				type: 'pie',
				radius: radius2,
				center: ['50%', '50%'],
				hoverAnimation: false,
				startAngle: 90,
				selectedMode: 'single',
				selectedOffset: 0,
				itemStyle: {
					color: (params: { dataIndex: number }) => {
						return color2[params.dataIndex]
					}
				},
				label: {
					show: false
				},
				labelLine: {
					show: false
				},
				data: data1,
				z: 666
			},
			{
				type: 'pie',
				radius: radius,
				center: ['50%', '50%'],
				hoverAnimation: false,
				startAngle: 90,
				selectedMode: 'single',
				selectedOffset: 0,
				itemStyle: {
					color: (params: { dataIndex: number }) => {
						return color3[params.dataIndex]
					}
				},
				label: {
					show: false
				},
				labelLine: {
					show: false
				},
				data: data1,
				z: 666
			}
		]
	}
}
/**
 * 动态仪表盘图
 */
// 获取圆上面某点的坐标（x0:表示x坐标， y0:表示y坐标，r:半径，angle:角度）
function getCirclePoint(x0: number, y0: number, r: number, angle: number) {
	const x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
	const y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
	return {
		x: x1,
		y: y1
	}
}
//颜色配置类型
interface ColorConfig {
	fontColor: string
	color: string
	noColor: string
	outerRing: string
	innerRing: string
	stroke: string
}
const baseQuantity = 0.87
export const dashborad = (colorConfig: ColorConfig, angle: number) => {
	return {
		series: [
			{
				type: 'custom',
				renderItem: (params: any, api: any) => {
					console.log(api, api.getWidth(), api.getHeight())
					return {
						type: 'arc',
						shape: {
							cx: api.getWidth() / 2,
							cy: api.getHeight() / 2,
							r: (Math.min(api.getWidth(), api.getHeight()) / 2.2) * baseQuantity,
							startAngle: (angle * Math.PI) / 180,
							endAngle: ((90 + angle) * Math.PI) / 180
						},
						style: {
							stroke: '#0cd3db',
							fill: 'transparent',
							lineWidth: 1.5
						},
						silent: true
					}
				},
				data: [0]
			}
		]
	}
}
