import React, { Component, PropTypes } from 'react';
import ProHub from '../utils/ProHub';
import classNames from 'classnames';
import Loading from '../components/Loading';
import {Link} from 'react-router';
import MyChart from '../components/MyChart';

export default class Result extends Component{
    //请求之后更新state
    componentDidMount = () => {
        ProHub.requestForData("trend.json",function(data) {
            this.setState({
                loaded: true,
                trend: data.data
            });
        }.bind(this));
    };
    //初始化state
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            trend: {
            }
        }
    };
    render(){
        let trend = this.state.trend,
            fundState = trend.fundState;
        let subState = fundState == "1" ?<p className="size14r">当前收益<span className="size10r sub-state">可订阅</span></p> : <p className="size14r">最高收益</p>;
        let subscribeResult = "";
        if(fundState == "2") {
            subscribeResult = <img className="abs-rt pct30" src="../images/success.png" alt=""/>
        }else if(fundState == "3") {
            subscribeResult = <img className="abs-rt pct30" src="../images/fail.png" alt=""/>
        }
        
        return <div>
            <div className={this.state.loaded ? "scale-box bg-white" : "vb-hide bg-white" }>
                <header className="detail-header ta-c white">
                    {subState}
                    <div className="mt15r pct-num">
                        <h6>
                            {trend.currentProfit}
                            <span className="size24r">%</span>
                        </h6>
                    </div>
                    <div className="info flexbox size14r">
                        <div className="flexbox-item pr ta-c">
                            <h3 className="text-pink">目标收益</h3>
                            <h4 className="mt10r">{trend.targetProfit}%</h4>
                        </div>
                        <div className="flexbox-item pr lr-border ta-c">
                            <h3 className="text-pink">已运行</h3>
                            <h4 className="mt10r">{trend.runDate}天</h4>
                        </div>
                        <div className="flexbox-item pr ta-c">
                            <h3 className="text-pink">沪深300</h3>
                            <h4 className="mt10r">{trend.grail}%</h4>
                        </div>
                    </div>
                </header>
                <div className="pr border-b">
                    <div className="pr auto pct85">
                        {subscribeResult}
                        <div className="stock-box bg-white size17r">
                            <div className="pl20r pr20r">
                                <div className="pb15r pr border-b">
                                    <p className="size10r gray">关注个股</p>
                                    <h3 className="mt10r size22r">{trend.stockName}&nbsp; <span className="size16r">{trend.stockCode}</span></h3>
                                    {fundState == "1" ? <p className="stock-btn">买入</p> : ""}
                                </div>
                            </div>
                            <div className="flexbox pl25r pt15r">
                                <div className="flexbox-item">
                                    <p className="size10r gray">关注价</p>
                                    <h3 className="mt8r size17r">{trend.oldPrice}</h3>
                                </div>
                                <div className="flexbox-item">
                                    <p className="size10r gray">{fundState == "1" ? "当前价" : "最高价"}</p>
                                    <h3 className={fundState == "1" ? "mt8r size17r red" : "mt8r size17r"}>{trend.newPrice}</h3>
                                </div>
                                <div className="flexbox-item">
                                    <p className="size10r gray">目标价</p>
                                    <h3 className="mt8r size17r">{trend.targetPrice}</h3>
                                </div>
                                <div className="flexbox-item">
                                    <p className="size10r gray">止损价</p>
                                    <h3 className="mt8r size17r">{trend.stopLossPrice}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-cont  pr">
                        <div className="person-info">
                            <div className="more-info flexbox">
                                <div className="pr10r">
                                    <div className="person-img-detail">
                                        <img src={trend.imgURL || "../images/person-img.png"} alt=""/>
                                    </div>
                                </div>
                                <div className="flexbox-item">
                                    <h4 className="mt5r size14r">{trend.userName}</h4>
                                    <h5 className="size12r gray mt9r">{trend.publishDate} 开始运行</h5>
                                </div>
                                <Link to={{pathname:"/financialAdvisor", state: 1}} >
                                    <div className="other-detail">
                                        <span className="get-more pr">全部策略</span><span className="iconfont size12 icon-right ml5"></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray pt10r">
                    <div className="chart-box">
                        <span className="line-color bg-red"></span>策略收益
                        <span className="line-color bg-blue"></span>沪深300
                        <span className="line-color bg-light-orange"></span>目标收益
                        <span className="line-color bg-orange"></span>止损线
                    </div>
                    <MyChart></MyChart>
                </div>

            </div>
            <Loading isShow={this.state.loaded}></Loading>
        </div>

    }
}
