const vw = px => `${px / (375 / 100)}vw`

export default [
  {
    echart: {
      label: '讯盟IOC卡片',
      componentName: 'bar-chart',
      dataRes: {
        showLine: true,
        height: 320,
        grid: {
          left: 60,
          bottom: 20
        },
        dataX: ['朝阳区', '绿园区', '南关区', '二道区', '双阳区', '宽城区', '德惠市', '九台区', '农安市', '榆树市'],
        dataValue: [
          {
            title: '',
            stack: '',
            value: [11, 7, 6, 3, 1, 1, 1, 0, 0, 0]
          }
        ],
        yLineType: 'dashed',
        xAxis: {
          max: 12,
          interval: 3,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // rotate: 60,
            // fontSize: 8
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        barRadius: 0
      }
    },
    table: {
      head: ['序号', '单位详细名称', '参保人数', '控股企业数', '控股企业总投资额'],
      body: [
        ['', '中东长春轨迹客车股份有限公司', 12853, 8, 91678.08],
        ['', '长春华翔轿车消声器有限责任公司', 696, 6, 69000],
        ['', '吉林亚泰水泥有限公司', 1230, 2, 61332],
        ['', '富奥汽车零部件股份有限公司', 338, 5, 28797],
        ['', '吉林大华机械制造有限公司', 904, 2, 2000],
        ['', '长春安通林汽车饰件有限公司', 509, 1, 1500],
        ['', '天纳克一汽富晟(长春)汽车零部件有限公司', 250, 2, 1200],
        ['', '吉林精气神有机农业股份有限公司', 131, 2, 1100],
        ['', '长春金赛药业股份有限公司', 1315, 1, 1000],
        ['', '长春旭阳工业(集团)股份有限公司', 181, 1, 1000],
        ['', '长春一汽富晟李尔汽车电器有限公司', 842, 1, 1000],
        ['', '长春一东离合器股份有限公司', 19, 1, 973.65],
        ['', '长春一汽富晟特必克制动有限公司', 4246, 2, 600],
        ['', '长春百克生物科技股份公司', 838, 1, 350]
      ],
      showMore: true,
      componentName: 'ioc-table',
      showIndex: true,
      width: [vw(50), vw(80), vw(90), vw(80), vw(80)],
      headStyle: 'background: rgba(78, 180, 255, 0.1)',
      headClass: 'mt20'
    }
  }
]
