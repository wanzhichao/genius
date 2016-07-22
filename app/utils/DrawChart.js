import ProHub from './ProHub';

String.prototype.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
Array.prototype.max = function(){   //最大值
    return Math.max.apply({},this)
}
Array.prototype.min = function(){   //最小值
    return Math.min.apply({},this)
}
var stockKLine=function(ops){
    return stockKLine.fn.init(ops);
}
stockKLine.fn=stockKLine.prototype={
    init:function(ops){
        var _this=this;
        this.ops={
            closed:0,
            Open:0
        }
        $.extend(this.ops,ops)
        this.area=[]; //分时图数据数组
        this.volume=[];//柱状图数据数组
        this.ohlc=[];//kline图数据数组
        this.kVolume=[];//kline柱状图数据数组
        this.tSAverage=[];//分时均线数据数组
        this.kM5=[];//日k ma5数据数组
        this.kM10=[];//日k ma10数据数组
        this.kM20=[];//日k ma20数据数组
        this.tSData=[];//分时价格数据
        this.kDataMax=[];//日K价格最大值数据
        this.kDataMin=[];//日K价格最小值数据
        this.tSMiddle;//分时中线位置（昨日收盘价）
        this.kMiddle;//日K中线位置（昨日收盘价）
        this.maxTSData;//分时最大价格
        this.minTSData;//分时最小价格
        this.maxkData;//日K最大价格
        this.minkData;//日K最小价格
        this.maxTSPrice;//分时最大价格区间
        this.minTSPrice;//分时最小价格区间
        this.maxKPrice;//日K最大价格区间
        this.maxKPrice;//日K最小价格区间
        this.colors= ["#e4462e", "#4daf7b"];
        _this.events();
    },
    events:function(){
        var _this=this;
        _this.timeShareGetData();//调用（获取分时数据）
    },
    timeShareGetData:function(){//获取分时数据
        var _this=this;
        var code=location.search.getQueryString('code');
        var param={
            code:code
        }
        ProHub.jijin(param,function(data){
            // _this.timeShareAddData(data);
            $.each(data.data.stockChart,function(index,ele){
                _this.area.push({
                    x: ele[0],
                    y: ele[1]
                });
            });
            $.each(data.data.marketChart,function(index,ele){
                _this.volume.push({
                    x: ele[0],
                    y: ele[1]
                });
            });
            console.log(_this.volume)
            _this.timeShareOption();//调用（分时图配置参数）
            _this.timeShareBegin();//调用（画分时图）
        });
    },
    timeShareAddData:function(data){//分时图添加空数据
        var kChartLength=data.data.length;
        var year=data.data.length>0?data.data[0].daytime:"2016-01-14";
        var time=data.data.length>0?data.data[kChartLength-1].time:'0930';
        var time1=parseInt(time.slice(0,2));
        var time2=parseInt(time.slice(2));
        var time3;
        if(kChartLength==0){
            $('.tSmaxP,.tSminP,.tSmax,.tSmin').css('display','none');
        }
        for(var i=kChartLength;i<242;i++){
            time1=parseInt(time1);
            time2=parseInt(time2);
            if(time1!=11){
                time2++;
                if(time2==60){
                    time2=0;
                    time1++;
                }
            }else{
                time2++;
                if(time2==31){
                    time1=12;
                    time2=0;time1++;
                }
            }
            if(time1<10){
                time1='0'+time1;
            }else{
                time1=''+time1;
            }
            if(time2<10){
                time2='0'+time2;
            }else{
                time2=''+time2;
            }
            time3=time1+''+time2;
            data.data.push({
                "current":null,
                "shareTrade":null,
                "average":null,
                "daytime":year,
                "time":time3
            });
        }
    },
    timeShareOption:function(){//分时图配置参数
        var _this=this;
        var formatter = '%m/%d';
        // var groupingUnits = [[
        //     'millisecond',                         // unit name
        //     [1]                             // allowed multiples
        // ], [
        //     'minute',
        //     [1, 2]
        // ]];
        // Highcharts.setOptions({     //本地配置
        //     lang: {
        //         rangeSelectorFrom: "日期:",
        //         rangeSelectorTo: "至",
        //         rangeSelectorZoom: "范围",
        //         loading: '加载中...',
        //         shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        //         weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        //     }
        // });
        _this.timeShareOps = {
            chart: {
                // plotBorderWidth:1,
                // plotBorderColor:"#f0f0f0",
                spacingRight: 2,
                spacingLeft : 1,
                spacingTop:10,
                spacingBottom:0,
                borderColor:'#f0f0f0'  ,
                borderWidth:0
            },
            //版权信息
            credits: {enabled: false},
            scrollbar: {enabled: false},
            navigator: {enabled: false},
            plotOptions: {
                series: {
                    turboThreshold: Number.MAX_VALUE,
                    enableMouseTracking: false

                },
                area:{
                    lineWidth:1,
                    dataGrouping: {enabled: false}
                },
                line:{
                    lineWidth:1
                }
            },
            rangeSelector: {
                enabled: false
            },
            title: {text: null},
            tooltip: {enabled: false},
            xAxis: {

                lineColor: "white",
                // offset:-22,
                top:0,
                tickColor: false,
                tickInterval:24*3600*1000,
                minPadding: 0.01,
                labels: {
                    style: {
                        color: "#a5a5a5"
                    },
                    // x:-20,
                    y:30,
                    zIndex:10,
                    overflow:false,
                    formatter: function () {
                        return Highcharts.dateFormat(formatter, this.value);
                        // return this.value;
                    }
                }
            },
            yAxis: [{
                gridLineColor: "#f0f0f0",
                gridLineWidth: 1,
                opposite:false,
                // showLastLabel:true,
                showFirstLabel:true,
                // min:-10,
                plotLines: [{
                    color: '#fbaf71',
                    dashStyle: 'dash',
                    value: 10,
                    width: 1,
                    zIndex:5
                },
                    {
                        color: '#fcdc7e',
                        dashStyle: 'dash',
                        value: -10,
                        width: 1,
                        zIndex:5
                    }],
                labels: {
                    style: {
                        color: "#a5a5a5"
                    },
                    y:5,
                    x:-15,
                    overflow:false,
                    formatter: function () {
                        var value=this.value+'%';
                        return value;
                    }
                },
                title: {text: ''},
                tickInterval: 10,
                tickPositioner: function () {
                }
            }
            ],
            series: [{
                type: 'line',
                data: _this.area,
                tooltip: {
                    valueDecimals: 2
                },
                lineColor: "#eb333b",
                fillColor: {
                    // linearGradient: {
                    //     x1: 0,
                    //     y1: 0,
                    //     x2: 0,
                    //     y2: 1
                    // },
                    stops: [
                        [0, "#e8f8ff"]
                    ]
                },
                fillOpacity: .1,
                threshold: null
            },
                {
                    type: 'line',
                    data: _this.volume,
                    // tooltip: {
                    //     valueDecimals: 2
                    // },
                    lineColor: "#6ebbed",
                    fillColor: {
                        // linearGradient: {
                        //     x1: 0,
                        //     y1: 0,
                        //     x2: 0,
                        //     y2: 1
                        // },
                        stops: [
                            [0, "#e8f8ff"]
                        ]
                    },
                    fillOpacity: .1,
                    threshold: null
                }
            ]
        };
    },
    timeShareBegin:function(){//画分时图
        var _this=this;
        $('.stockLine').highcharts('StockChart',_this.timeShareOps);
    }
}
stockKLine.fn.init.prototype=stockKLine.prototype;

let drawChart = {
    stockKLine : stockKLine
};
export default drawChart;