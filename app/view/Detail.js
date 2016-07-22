import React, { Component, PropTypes } from 'react';
import ProHub from '../utils/ProHub'
import {Link} from 'react-router'
import Loading from '../components/Loading'
//可订阅状态
const CanSubscribe = React.createClass({

    render() {
        return <div className="subscribe bg-white size17r">
            <div className ="subscribe-cont">
                <span className="red">{this.props.data}</span>天后开始运行策略
                <Link to={{pathname:"/result", state: 1}} >
                    <p className="subscribe-btn size14r inline-block ta-c"><span className="font-bold add-icon">+</span> 订阅</p>
                </Link>
            </div>
        </div>
    }
});

//满额状态下组件
const SubscribeFull = React.createClass({

    render() {
        return <div className="subscribe bg-white size17r">
            <div className ="subscribe-cont">
                <span className="red">{this.props.data}</span>天后开始运行策略
                <span className="fr size17r ta-c gray">已满额</span>
            </div>
        </div>
    }
});
//不可预订状态下组件
const CannotSubscribe = React.createClass({

    render() {
        return <div className="subscribe bg-white size17r">
            <div className ="subscribe-cont ta-c">
                策略运行中，不可预订
            </div>
        </div>
    }
});

export default class Detail extends Component{

    componentDidMount = () => {
        let self = this;

        if(window.data.detailState === this.props.location.state) {
            this.setState({
                loaded: true,
                fundData: window.data.detail
            });
            setTimeout(function() {
                self.setState({
                    isAnim: true
                });
            },100)
        }else{
            ProHub.requestForData("detail.json", function(data) {
                this.setState({
                    loaded: true,
                    isAnim:true,
                    fundData: data.data
                });
                window.data.detailState = this.props.location.state;
                window.data.detail = data.data;
            }.bind(this));
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isAnim:false,
            type: 1,
            fundData: {
            }
        }
    }
    render(){
        let fundDate = this.state.fundData;
        let subscribe = <CanSubscribe data={fundDate.runDate}></CanSubscribe>;
        if(fundDate.fundState == "已满员") {
            subscribe = <SubscribeFull data={fundDate.runDate}></SubscribeFull>;
        }else if(fundDate.fundState == "运行中"){
            subscribe = <CannotSubscribe></CannotSubscribe>;
        }

            return <div>
            <div className={this.state.isAnim ? "bg-white scale-box":"bg-white vb-hide"}>
                <header className="detail-header ta-c white">
                    <p className="size14r">目标收益<span className="size10r sub-state">{fundDate.fundState == "运行中" ? "运行中":"可订阅"}</span></p>
                    <div className="mt15r pct-num">
                        <h6>
                            {fundDate.targetProfit}
                            <span className="size24r">%</span>
                        </h6>
                    </div>
                    <div className="info flexbox size14r">
                        <div className="flexbox-item pr ta-c">
                            <h3 className="text-pink">计划天数</h3>
                            <h4 className="mt10r">{fundDate.fundDay}</h4>
                        </div>
                        <div className="flexbox-item pr lr-border ta-c">
                            <h3 className="text-pink">订阅人数</h3>
                            <h4 className="mt10r">{fundDate.joinNum}</h4>
                        </div>
                        <div className="flexbox-item pr ta-c">
                            <h3 className="text-pink">满额人数</h3>
                            <h4 className="mt10r">{fundDate.highCount}</h4>
                        </div>
                    </div>
                </header>
                <div className="pr">
                    {subscribe}
                    <div className="detail-cont  pr">
                        <Link to={{pathname:"/financialAdvisor", state: 1}} >
                            <div className="person-info border-b">
                                <div className="more-info flexbox">
                                    <div className="pr10r">
                                        <div className="person-img-detail">
                                            <img src={fundDate.imgURL || "../images/person-img.png"} alt=""/>
                                        </div>
                                    </div>
                                    <div className="flexbox-item">
                                        <h4 className="mt5r size14r">{fundDate.userName}</h4>
                                        <h5 className="size12r gray mt9r">{fundDate.publishDate} 发布</h5>
                                    </div>
                                    <div className="other-detail">
                                        <span className="get-more pr">全部策略</span><span className="iconfont size12 icon-right ml5"></span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="success-box flexbox size14r">
                            <div className="success-txt flexbox flex-column">
                                <p className="flexbox-item">成功率</p>
                                <p className="flexbox-item">平均收益率</p>
                                <p className="flexbox-item">成功次数</p>
                            </div>
                            <div className="success-rate flexbox flexbox-item flex-column">
                                <div className="flexbox-item">
                                    <div className="pct100 mt5r rate-box">
                                        <div className="rate-pct" style={{width:this.state.loaded ? fundDate.successRate + '%' : 0}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="flexbox-item">
                                    <div className="pct100 mt5r rate-box">
                                        <div className="rate-pct" style={{width:this.state.loaded ? fundDate.profitRate+ '%' : 0}}>
                                        </div>
                                    </div>
                                </div>
                                <div className="flexbox-item">
                                    <div className="pct100 mt5r rate-box">
                                        <div className="rate-pct" style={{width:this.state.loaded ? '88%' : 0}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="success-rate-txt flexbox flex-column">
                                <p className="flexbox-item">{fundDate.successRate}%</p>
                                <p className="flexbox-item">{fundDate.profitRate}%</p>
                                <p className="flexbox-item">{fundDate.successNum}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <Loading isShow={this.state.loaded}></Loading>
        </div>


    }
}
