<template>
  <div id="container"></div>
</template>

<script setup>
import { inject, onMounted, onUnmounted, watch } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
const mapMsg = inject("handleMapMsg", null);
const icons = [
  {
    type: 1,
    icon: "🏨", // 旅馆
  },
  {
    type: 2,
    icon: "🍽️", // 餐厅
  },
  {
    type: 3,
    icon: "🚩", // 通用
  },
];
watch(
  () => mapMsg.value,
  (v) => {
    // console.log(v);
    switch (v?.type) {
      case 1:
        setMaket(v);
        break;

      default:
        break;
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "492210b60b207632da3b51a4c4b84111",
  };
  AMapLoader.load({
    key: "5ade7b792cef9a3b3969bc39858fccaf",
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.LineSearch", "AMap.ControlBar"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        pitch: 20, //地图俯仰角度，有效范围 0 度- 83 度
        rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
        pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});

// 地图设置标记点
function setMaket(data) {
  map.clearMap();
  let list = data.position.map((res) => ({
    position: new AMap.LngLat(res.split(",")[0], res.split(",")[1]),
    text: "Restaurants", // Hotels
    icon: 1,
  }));

  list.forEach((item) => {
    // 点标记显示内容，HTML要素字符串
    const markerContent =
      '<div class="font20 icon-sty">' + `${icons[2]?.icon}` + "</div>";
    //   '<div class="font20 icon-sty">' + `<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png">` + "</div>";

    const marker = new AMap.Marker({
      position: item.position,
      // 将 html 传给 content
      content: markerContent,
      // 以 icon 的 [center bottom] 为原点
      offset: new AMap.Pixel(-13, -30),
    });
    var newCenter = [data.position[0].split(",")[0], data.position[0].split(",")[1]];
	map.setZoom(9);
    map.setCenter(newCenter);
    // 将 markers 添加到地图
    map?.add(marker);
  });
}

// 清除 marker
function clearMarker() {
  map.clearMap();
  //   map.remove(marker);
}
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100vh;
}
:deep(.iconfont) {
  font-size: 20px;
}
:deep(.icon-sty) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  font-size: 20px;
  padding: 8px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
}
</style>
