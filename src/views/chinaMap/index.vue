<!--
 * @version:
 * @Author: LHF
 * @Date: 2021-05-22 10:03:58
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-24 16:45:37
-->
<template>
  <div class="map-wrap">
    <div class="logo"></div>
    <div class="time">
      <div class="tt">{{ hms }}</div>
      <div class="day">
        <div class="rz">{{ MM.indexOf('0') === -1 ? MM : MM.slice(1, 2) }}月{{ DD }}日</div>
        <div class="year">{{ year || '2021' }}</div>
      </div>
      <div class="city">{{ cityName || '浙江' }}</div>
    </div>
    <div id="city"></div>
    <div class="citywraper">
      <div class="cityName">{{ cityName || '浙江' }}</div>
      <div class="quyu">
        <img src="../../assets/images/province1.png" alt="" class="imgPosition" />
        <div class="Dot"></div>
        <div class="xian1"></div>
        <div class="xian2"></div>
        <div class="xian3"></div>
        <div class="xian4"></div>
      </div>
    </div>
    <div class="tableWrap">
      <!-- 表1 -->
      <div class="pie-box">
        <div class="header-tab">
          <!-- <div :class="{ topstyle: isShow }" class="top " @click="changeHeightL">会员数</div>
          <div class="top" :class="{ topstyle: isShow }">订单数</div>
          <div class="top">订单额</div>
          <div class="top">收益</div> -->
          <div
            v-for="(item, index) in piedata1"
            :key="index"
            :class="{ topstyle: isHighlight1 === index }"
            class="top"
            @click="changeHighlight1(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <!-- 饼状图 -->
        <div class="circle-bg">
          <div ref="pie1" class="circle"></div>
        </div>
        <div class="pie-bg2">总数</div>
        <div class="pie-bg3">6,827,100,815</div>
      </div>
      <!-- 表2 -->
      <div class="pie-box2">
        <div class="header-tab">
          <div
            v-for="(item, index) in piedata2"
            :key="index"
            :class="{ topstyle: isHighlight2 === index }"
            class="top"
            @click="changeHighlight2(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="circle-bg">
          <div ref="pie2" class="circle2"></div>
        </div>
      </div>
      <!-- 表3 -->
      <div class="histogram-week">
        <div class="header-tab">
          <div class="top topstyle">会员数</div>
          <div class="top">订单数</div>
          <div class="top">订单额</div>
          <div class="top">收益</div>
        </div>
        <div class="histogram-bg">
          <div ref="bar" class="histogram"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapCofig from '../../utils/Maputils';
import '../../assets/js/wy_rem';
import axios from 'axios';
let that;
export default {
  name: 'Nihao',
  data() {
    return {
      piedata1: [
        {
          name: '会员',
        },
        {
          name: '订单',
        },
        {
          name: '订单额',
        },
        {
          name: '收益',
        },
      ],
      piedata2: [
        {
          name: '消费金额来源',
        },
        {
          name: '消费次数来源',
        },
      ],
      dom: null,
      timer: null,
      chake: false,
      NamexS: '',
      isxianshow: false,
      cityName: '',
      year: '',
      MM: '',
      DD: '',
      hms: this.$moment().format('HH:mm:ss'),
      isHighlight1: 0,
      isHighlight2: 0,
    };
  },
  created() {
    that = this;
    this.year = this.$moment().format('YYYY');
    this.MM = this.$moment().format('MM');
    this.DD = this.$moment().format('DD');
    this.hms = this.$moment().format('HH:mm:ss');
    // 表1配置
    this.option1 = {
      title: {
        text: '所占比例',
        top: '5%',
        left: 'left',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bolder',
          color: '#f3c800',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'right',
        y: 'bottom',
        orient: 'vertical',
        textStyle: {
          fontWeight: 'bolder',
          color: '#fff',
        },
      },
      series: [
        {
          name: '会员数',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            fontSize: 16,
            formatter: val => {
              // if (val.data.name === '该省') {
              //   return val.data.value / 100 + '%';
              // } else {
              //   return `${val.data.name}
              //           ${val.data.value / 100}%`;
              // }
              // console.log(val.data.value);
              return `${val.data.name}\r\n${val.data.value / 100}%`;
            },
          },
          itemStyle: {
            color: function(params) {
              //自定义颜色
              var colorList = ['#f3c800', '#00c6f7'];
              return colorList[params.dataIndex];
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 2500, name: that.cityName || '浙江' },
            { value: 7500, name: '全国' },
          ],
          height: '100%',
        },
      ],
    };
    //表2配置
    this.option2 = {
      // 标题
      title: {
        text: '所占比例',
        top: '5%',
        left: 'left',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bolder',
          color: '#f3c800',
        },
      },
      legend: {
        x: 'right',
        y: 'bottom',
        orient: 'vertical',
        textStyle: {
          fontWeight: 'bolder',
          color: '#fff',
        },
      },
      series: [
        {
          name: '消费金额来源',
          type: 'pie',
          avoidLabelOverlap: true,
          itemStyle: {
            color: function(params) {
              //自定义颜色
              var colorList = ['#f3c800', '#00c6f7', '#00ffde'];
              return colorList[params.dataIndex];
            },
          },
          label: {
            position: 'inside',
            formatter: val => {
              return `${val.data.value / 100}%`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            show: false,
          },
          //表格数据
          data: [
            { value: 2600, name: '本省去他省消费金额' },
            { value: 3800, name: '他省去本省消费金额' },
            { value: 3600, name: '本省消费金额' },
          ],
          height: '75%',
        },
      ],
    };
    //表3配置
    this.option3 = {
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 430],
          type: 'bar',
        },
      ],
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.year = this.$moment().format('YYYY');
      this.MM = this.$moment().format('MM');
      this.DD = this.$moment().format('DD');
      this.hms = this.$moment().format('HH:mm:ss');
    }, 1000);
    this.createMychart1();
    this.createMychart2();
    this.createMychart3();
    //console.log(MapCofig,'配置')
    that.$nextTick(async () => {
      that.dom = document.getElementById('city');
      that.myChart = that.$echarts.init(that.dom);
      const MapOptions = await that.startIonMap('浙江');
      if (MapOptions && typeof MapOptions === 'object') {
        // //debugger
        that.myChart.setOption(MapOptions);
      }
      // that.timer = setInterval(async()=>{
      //     let xx = Math.floor((Math.random()* MapCofig.provincesText.length))
      //     // const MapOptions = await that.startIonMap('浙江');
      //     // console.log(MapCofig.provincesText)
      //     const MapOptions = await that.startIonMap(MapCofig.provincesText[xx]);
      //     // debugger
      //     // //debugger
      //     if (MapOptions && typeof MapOptions === "object") {
      //         // //debugger
      //         that.myChart.setOption(MapOptions);
      //     }
      // },4000)
      that.myChart.on('click', async params => {
        this.cityName = params.name;
        that.chake = false;
        that.isxianshow = false;
        console.log();
        event.stopPropagation();
        let proviceIndex = MapCofig.provincesText.findIndex(x => {
          return params.name === x;
        });
        let proviceName = MapCofig.provincesText.filter(x => {
          return params.name === x;
        });
        if (proviceIndex === -1) return;
        let provinceAlphabet = MapCofig.provinces[proviceIndex];
        const MapOptions = await that.startIonMap(proviceName.toString(), provinceAlphabet);
        if (MapOptions && typeof MapOptions === 'object') {
          that.myChart.setOption(MapOptions);
          setTimeout(() => {
            that.chake = true;
            that.NamexS = proviceName;
            setTimeout(() => {
              that.isxianshow = true;
            }, 1800);
          }, 900);
        }
        // debugger;
        this.option1.series[0].data[0].name = this.cityName;
        // debugger;
        this.myChart1.setOption(this.option1);
      });
    });
  },
  methods: {
    changeHighlight1(index) {
      this.isHighlight1 = index;
      switch (index) {
        case 0:
          console.log('会员');
          // this.myChart1.setOption(this.option1);
          this.createMychart1('会员');
          break;
        case 1:
          console.log('订单');
          // this.myChart1.setOption(this.option1);
          this.createMychart1('订单');
          break;
        case 2:
          console.log('订单额');
          // this.myChart1.setOption(this.option1);
          this.createMychart1('订单额');
          break;
        case 3:
          console.log('收益');
          // this.myChart1.setOption(this.option1);
          this.createMychart1('收益');
          break;
      }
    },
    changeHighlight2(index) {
      this.isHighlight2 = index;
      switch (index) {
        case 0:
          console.log('消费金额来源');
          this.createMychart2('消费金额来源');
          break;
        case 1:
          console.log('消费次数来源');
          this.createMychart2('消费次数来源');
          break;
      }
    },
    createMychart1(name) {
      // debugger;
      // let chartDom = this.$refs.pie1;
      this.$refs.pie1.setAttribute('_echarts_instance_', '');
      this.option1.series[0].name = name;
      this.myChart1 = this.$echarts.init(this.$refs.pie1);
      // console.log(chartDom, this.$refs.pie1);
      this.option1 && this.myChart1.setOption(this.option1, true);
    },
    createMychart2(name) {
      // debugger;
      // let chartDom = this.$refs.pie1;
      this.$refs.pie2.setAttribute('_echarts_instance_', '');
      // this.option1.series[0].name = name;
      this.option2.series[0].name = name;
      this.myChart2 = this.$echarts.init(this.$refs.pie2);
      // console.log(chartDom, this.$refs.pie1);
      this.option2 && this.myChart2.setOption(this.option2, true);
    },
    createMychart3(name) {
      // debugger;
      // let chartDom = this.$refs.pie1;
      this.$refs.bar.setAttribute('_echarts_instance_', '');
      this.myChart3 = this.$echarts.init(this.$refs.bar);
      // console.log(chartDom, this.$refs.pie1);
      this.option3 && this.myChart3.setOption(this.option3, true);
    },
    RandomConfiguration(proviceName, nextArray) {
      // debugger
      let series = [];
      return new Promise((resolve, reject) => {
        // console.log(MapCofig.HZData,'xxxxxxxxxxxxxxxxxxxx')
        // console.log(nextArray,'xxxxxxxxxxxxxxxxxxxx')
        // debugger
        // debugger

        [[proviceName, nextArray]].forEach(function(item, i) {
          series.push(
            {
              type: 'map',
              roam: false,
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: '#1DE9B6',
                  },
                },
                emphasis: {
                  textStyle: {
                    color: 'rgb(183,185,14)',
                  },
                },
              },

              itemStyle: {
                normal: {
                  borderColor: '#0b4a67', //线的颜色
                  borderWidth: 2,
                  areaColor: '#051931',
                },
                emphasis: {
                  areaColor: 'rgb(46,229,206)',
                  shadowColor: 'rgb(12,25,50)',
                  borderWidth: 1.4,
                },
              },
              zoom: 1.1,
              map: 'china', //使用
            },
            {
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                normal: {
                  color: '#1DE9B6',
                  width: 1.5, //线条宽度
                  opacity: 0.5, //尾迹线条透明度
                  curveness: 0.3, //尾迹线条曲直度
                },
              },
              data: that.convertData(item[1]),
            },
            {
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                normal: {
                  color: '#1DE9B6',
                  width: 2, //线条宽度
                  opacity: 0.1, //尾迹线条透明度
                  curveness: 0.3, //尾迹线条曲直度
                },
              },
              data: that.convertData(item[1]),
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              showEffectOn: 'render',
              zlevel: 1,
              rippleEffect: {
                period: 15,
                scale: 2,
                brushType: 'fill',
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'center',
                  offset: [10, 10],
                  color: '#47ccd4',
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: '#1DE9B6',
                  shadowBlur: 5,
                  shadowColor: '#333',
                },
              },
              symbolSize: 12,
              data: item[1].map(function(dataItem) {
                // console.log(MapCofig.geoCoordsMap[dataItem[1].name])
                // console.log(MapCofig.geoCoordsMap)
                // console.log(dataItem)
                // debugger
                return {
                  name: dataItem[1].name,
                  itemStyle: { color: dataItem[1].lineStyle },
                  value: MapCofig.geoCoordsMap[dataItem[1].name].concat([dataItem[1].value]),
                };
              }),
            }
          );
        });
        resolve(series);
      });
    },
    async startIonMap(proviceName, provinceAlphabet) {
      //默认杭州
      // debugger
      let loadedDataURL = '/api/map/china.json';
      let shuzu = []; //飞线到要的位置
      let shuzuN = [];
      // let color = ['#52b9c7','#5abead','#f34e2b','#f56321','#f56f1c','#f58414','#f56f1c','#f56321','#4ab2e5']
      let color = ['#52b9c7', '#5abead', '#f34e2b', '#f56f1c', '#f56321', '#4ab2e5'];
      let TextCtiy = MapCofig.provincesText.filter(item => item !== proviceName);
      // console.log(MapCofig.HZData)
      let newpushx = null;
      let newMap = new Map();
      let indexa = -1;
      while (++indexa < 6) {
        let xx = Math.floor(Math.random() * TextCtiy.length);
        if (newMap.get(xx)) {
          --indexa;
        } else {
          newMap.set(xx, xx);
        }
      }
      newpushx = Array.from([...newMap.values()]);
      // console.log(newpushx)
      for (let index = 0; index < 6; index++) {
        // debugger
        shuzu.push(
          { name: proviceName },
          {
            name: TextCtiy[newpushx[index]],
            value: 8,
            lineStyle: color[index],
          }
        );
        if (shuzu.length == 2) {
          let pick = [];
          while (shuzu.length) {
            let max = shuzu.shift();
            pick.push(max);
          }
          shuzuN.push(pick);
        }
      }
      shuzu.push(
        { name: proviceName },
        {
          name: proviceName,
          value: 8,
          lineStyle: '#5abead',
        }
      );
      shuzuN.push(shuzu);
      const MapData = await axios.get(loadedDataURL);
      that.$echarts.registerMap('china', MapData.data);
      const newSeres = await that.RandomConfiguration(proviceName, shuzuN);
      // debugger
      let option = {
        // backgroundColor: "white",
        roam: false,
        // tooltip: {
        // trigger: "item",
        // },
        geo: {
          map: 'china',
          aspectScale: 0.75, //长宽比
          zoom: 1.1,
          roam: false,
          itemStyle: {
            normal: {
              opacity: '0.8',
              borderColor: 'borderColor',
              borderWidth: 3,
              shadowColor: 'borderColor',
              shadowOffsetX: 4,
              shadowOffsetY: 8,
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false,
              },
            },
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                areaColor: 'rgba(0, 10, 52, 1)',

                borderColor: 'rgba(0, 10, 52, 1)',
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                    color: '#009cc9',
                  },
                },
              },
            },
          ],
        },
        series: newSeres,
      };
      return option;
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = MapCofig.geoCoordsMap[dataItem[0].name];
        var toCoord = MapCofig.geoCoordsMap[dataItem[1].name];
        var lineStyle = dataItem[1].lineStyle;
        if (fromCoord && toCoord) {
          res.push([
            { coord: fromCoord, lineStyle: { color: lineStyle } },
            { coord: toCoord, lineStyle: { color: lineStyle } },
          ]);
        }
      }
      return res;
    },
  },
};
</script>
<style lang="less" scoped>
.tob {
  margin-top: 362;
}
.map-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-image: url('../../assets/images/map-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .tableWrap {
    position: relative;
    top: -90px;
    right: 55px;
    display: flex;
    flex-direction: column;
    .pie-box {
      width: 280px;
      height: 342px;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;

        .top {
          font-size: 16px;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 30px;
          line-height: 30px;
          border-right: 1px solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
          cursor: pointer;
          z-index: 666;
        }
        .topstyle {
          border: 1px solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .circle-bg {
        width: 100%;
        height: 235px;
        background-color: pink;
        border: 1px solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .circle {
          z-index: 999;
          width: 100%;
          height: 100%;
        }
      }
      .pie-bg2 {
        height: 25px;
        line-height: 25px;
        width: 100%;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg2.png');
        box-sizing: border-box;
        font-size: 14px;
        color: #f3c800;
        padding-left: 10px;
        border: 1px solid #00b5e3;
      }
      .pie-bg3 {
        height: 50px;
        line-height: 50px;
        width: 100%;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg3.png');
        box-sizing: border-box;
        font-size: 18px;
        color: #f3c800;
        border: 1px solid #00b5e3;
        text-align: center;
      }
    }
    .pie-box2 {
      margin-top: 355px;
      width: 280px;
      height: 282px;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;
        .top {
          font-size: 18px;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 30px;
          line-height: 30px;
          border-right: 1px solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
          z-index: 666;
          cursor: pointer;
        }
        .topstyle {
          border: 1px solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .circle-bg {
        width: 100%;
        height: 250px;
        border: 1px solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .circle2 {
          z-index: 999;
          width: 100%;
          height: 100%;
        }
      }
    }
    .histogram-week {
      margin-top: 655px;
      width: 280px;
      height: 230px;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;
        .top {
          font-size: 16px;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
        }
        .topstyle {
          border: 1px solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .histogram-bg {
        width: 100%;
        height: 197px;
        border: 1px solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .histogram {
          width: 100%;
          height: 200px;
        }
      }
    }
  }
  .logo {
    left: 15px;
    top: 15px;
    width: 400px;
    height: 80px;
    background-image: url('../../assets/images/map-logo.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    position: absolute;
  }
  .time {
    width: 500px;
    height: 80px;
    background-image: url('../../assets/images/map-time.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    position: absolute;
    right: 15px;
    top: 15px;
    .tt {
      font-size: 23px;
      position: absolute;
      height: 80px;
      line-height: 80px;
      left: 25px;
      color: #68efff;
    }
    .day {
      font-size: 15px;
      position: absolute;
      height: 80px;
      line-height: 80px;
      left: 30px;
      color: #007285;
      .rz {
        width: 100px;
        font-size: 23px;
        position: absolute;
        height: 80px;
        line-height: 80px;
        left: 115px;
        color: #007285;
      }
      .year {
        width: 100px;
        font-size: 23px;
        position: absolute;
        height: 80px;
        line-height: 80px;
        left: 205px;
        color: #007285;
      }
    }
    .city {
      font-size: 25px;
      position: absolute;
      height: 80px;
      line-height: 80px;
      left: 320px;
      color: #007285;
    }
  }
  .citywraper {
    position: relative;
    top: 42%;
    left: 48.5%;
    width: 335px;
    height: 208px;
    background-image: url('../../assets/images/map-k.png');
    background-repeat: no-repeat;
    .cityName {
      position: absolute;
      top: 9px;
      left: 25px;
      color: #00d6f0;
      font-size: 15px;
      font-weight: 600;
    }
    .quyu {
      width: 100%;
      height: 100%;
      text-align: center;
      .imgPosition {
        margin-top: 40px;
      }
      .Dot {
        &::before {
          content: '';
          width: 20px;
          height: 20px;
          background-color: #f3c800;
          border-radius: 50%;
          position: absolute;
          top: 109px;
          left: 154px;
          z-index: 2;
        }

        &::after {
          content: '';
          position: absolute;
          background-color: #f3c800;
          border-radius: 50%;
          z-index: 1;
          animation: mymove 1s infinite;
          -webkit-animation: mymove 1s infinite;
        }
        @keyframes mymove {
          from {
            width: 0;
            height: 0;
            opacity: 1;
            top: 115px;
            left: 160px;
          }
          to {
            width: 60px;
            height: 60px;
            opacity: 0;
            top: 90px;
            left: 135px;
          }
        }
      }
    }
  }
}
.map-wrap .citywraper .map-wrap .province {
  /* width: 5.376rem;
  height: 3.408rem;
  background-image: url('../../assets/images/k-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 14.704rem;
  top: 7.552rem;
  z-index: 111; */
  width: 3.376rem;
  height: 2.408rem;
  background-image: url(/static/img/k-bg.b35c50b.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 9.3rem;
  top: 4.2rem;
  z-index: 111;
  transform: scale(0);
  transition: all 1s;
  opacity: 0;
  /* display: none; */
}
.map-wrap .province .name {
  position: absolute;
  font-size: 0.214rem;
  color: #00ddf7;
  left: 0.416rem;
  top: 0.228rem;
  font-weight: bold;
}
.map-wrap .province .quyu {
  width: 4rem;
  height: 2rem;
  position: absolute;
  top: 0.24rem;
  left: -0.2rem;
}
.map-wrap .province .quyu img {
  height: 100%;
  display: block;
  margin: 0 auto;
}
.map-wrap .province .quyu .fg-dot {
  width: 0.22rem;
  height: 0.22rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -0.16rem;
  margin-top: -0.16rem;
  background: #f3c800;
  border-radius: 0.16rem;
}
.map-wrap #city {
  width: 23.2rem;
  height: 16rem;
  /* background: #1B1B1B; */
  position: absolute;
  left: -2rem;
  top: -1rem;
  z-index: 11;
  transform: scale(0.9);
}
/* .abc{
  width: 23.2rem;
  height: 16rem;
  position: absolute;
  left: 0;
  top: 0;
  background: transparent;
  z-index: 2;
} */

#city-map {
  width: 23.2rem;
  height: 16rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: transparent;
}
.ischangeShow {
  transform: scale(1) !important;
  transition: all 1s !important;
  opacity: 1 !important;
}
.xian1Animation {
  animation: xian1 1s linear 0s 1;
  display: block !important;
}
.xian2Animation {
  animation: xian2 1s linear 0s 1;
  display: block !important;
}
.xian3Animation {
  animation: xian3 1s linear 0s 1;
  display: block !important;
}
.xian4Animation {
  animation: xian4 1s linear 0s 1;
  display: block !important;
}
@keyframes xian1 {
  from {
    width: 0;
    margin-top: 0rem;
    margin-left: 0rem;
    transform: rotate(-55deg);
    opacity: 0;
  }
  to {
    width: 3.44rem;
    margin-top: -1.504rem;
    margin-left: -0.72rem;
    transform: rotate(-55deg);
    opacity: 1;
  }
}
@keyframes xian2 {
  from {
    width: 0;
    margin-top: 0rem;
    margin-left: 0rem;
    transform: rotate(-75deg);
    opacity: 0;
  }
  to {
    width: 4.576rem;
    margin-top: -2.336rem;
    margin-left: -1.696rem;
    transform: rotate(-75deg);
    opacity: 1;
  }
}
@keyframes xian3 {
  from {
    height: 0;
    margin-top: 0rem;
    margin-left: 0rem;
    transform: rotate(53deg);
    opacity: 0;
  }
  to {
    height: 8rem;
    margin-top: -1.568rem;
    margin-left: -3.216rem;
    transform: rotate(53deg);
    opacity: 1;
  }
}
@keyframes xian4 {
  from {
    height: 0;
    margin-top: 0rem;
    margin-left: 0rem;
    transform: rotate(37deg);
    opacity: 0;
  }
  to {
    height: 6.944rem;
    margin-top: -0.64rem;
    margin-left: -2.144rem;
    transform: rotate(37deg);
    opacity: 1;
  }
}
.map-wrap .province .quyu .xian1 {
  width: 3.44rem;
  height: 0.048rem;
  background: rgba(243, 200, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -1.504rem;
  margin-left: -0.72rem;
  transform: rotate(-55deg);
  opacity: 1;
  /*animation: xian1 1s linear 0s;*/
}
.map-wrap .province .quyu .xian2 {
  width: 4.576rem;
  height: 0.048rem;
  background: rgba(243, 200, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -2.336rem;
  margin-left: -1.696rem;
  transform: rotate(-75deg);
  opacity: 1;
  /*animation: xian2 1s linear 0s;*/
}
.map-wrap .province .quyu .xian3 {
  height: 8rem;
  width: 0.018rem;
  background: rgba(243, 200, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -1.568rem;
  margin-left: -3.216rem;
  transform: rotate(53deg);
  opacity: 1;
  /*animation: xian3 1s linear 0s;*/
}
.map-wrap .province .quyu .xian4 {
  height: 6.944rem;
  width: 0.018rem;
  background: rgba(243, 200, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -0.64rem;
  margin-left: -2.144rem;
  transform: rotate(37deg);
  opacity: 1;
  /*animation: xian4 1s linear 0s;*/
}
.noshow {
  display: none;
}
</style>

<style scoped>
/* @import '../../assets/js/ceshi.scss'; */
</style>
