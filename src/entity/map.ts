export interface Region {
	gridLevel: number
	itemStyle: {
		areaColor: {
			image: HTMLImageElement | string
			repeat: string
		}
		borderColor: string
		borderWidth: number
	}
	name?: string
}
export interface Scatter {
	value: Array<number>
	img: string
	gridLevel: number
	name?: string
	[key: string]: unknown
}
export interface Line {
	gridLevel: number
	value: number
	name?: string
}
export interface ToData {
	toName: string
	coords: Array<number>
	gridLevel: number
	value: number
	fromName?: string
}
export interface DataConfig {
	xAxisData: Array<number> | Array<string>
	legendData: Array<string>
	seriesData: Array<Array<number>>
}
