<template>
	<div id="container" tabindex="0"></div>
</template>
<script lang="ts" setup>
//进行地图初始化
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import huzhouJson from '@/assets/json/Huzhou.json'

let map = ref()
AMapLoader.load({
	key: 'ab30bdd4e25ba363f19c65afd9986656', // 申请好的Web端开发者Key，首次调用 load 时必填
	version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
	plugins: ['AMap.GeoJSON'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	AMapUI: {
		// 是否加载 AMapUI，缺省不加载
		version: '1.1', // AMapUI 版本
		plugins: ['overlay/SimpleMarker'] // 需要加载的 AMapUI ui插件
	},
	Loca: {
		// 是否加载 Loca， 缺省不加载
		version: '2.0' // Loca 版本
	}
}).then(AMap => {
	map.value = new AMap.Map('container', {
		mask: '',
		//设置地图容器
		//是否为3D地图模式
		viewMode: 'road',
		center: [119.853031, 30.80838], //初始化地图中心点位置
		mapStyle: 'amap://styles/darkblue',
		zoom: 10.5,
		resizeEnable: true // 开启地图自适应容器大小
	})
	const geojson = new AMap.GeoJSON({
		geoJSON: huzhouJson,
		getPolygon: function (geojson: string, lnglats: string[]) {
			return new AMap.Polygon({
				path: lnglats,
				strokeWeight: 2, // 轮廓线宽度
				fillOpacity: 0.15, //透明度
				fillColor: 'red', //填充颜色
				strokeColor: 'white' //线条颜色
			})
		}
	})
	map.value.add(geojson)
})
</script>
<style lang="scss" scoped>
#container {
	width: 100vw;
	height: 100vh;
}
</style>
