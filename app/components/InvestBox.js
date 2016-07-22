import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

//首页组件
export default class InvestBox extends Component{

    constructor(props) {
        super(props)
        this.state = {
            index: props.index,
            style: {

            }
        }
    }
    componentDidMount = () =>{
        let self = this;
        setTimeout(function(){
            self.setState({
                style: {
                    transition: "all .3s ease-out " + self.state.index*0.2 +"s",
                    opacity: 1,
                    WebkitTransform: "translateX(0)"
                }
            })
        },300);
    };
    render(){
        let {data, type, index} = this.props;
        let showNum = type == "working" ? "pct40" : "flexbox-item";
        let successState = data.successState == "成功" ? "" : "fail";
        return <div className="invest-box bg-white black" style={this.state.style}>
            <p className="size17r pl15r">{data.fundName}{type == "completed"? <span className={classNames("complete size10r white ta-c", successState)}>{data.successState}</span>:""}</p>
            <div className="flexbox mt20r border-b pb20r">
                <div className="flexbox-item pr pl15r border-r">
                    <p className="gray size12r">目标收益</p>
                    <p className="size26r red mt10r">{data.incomeRate}%</p>
                    <span className="sub-info">{data.incomeDay}天</span>
                </div>
                <div className={classNames("pr pl15r", showNum)}>
                    <p className="gray size12r">成功率</p>
                    <p className="size26r mt10r">{data.successRate}%</p>
                    {type == "1"? <span className="sub-info">{data.successTime}次</span>:""}
                </div>
            </div>
            <div className="box-footer">
                <div className="footer-cont pr">
                    <div className="person-img"><img src={ data.imgURL || "../../images/person-img.png"} alt=""/></div>
                    <span className="size17r ml5r">{data.userName}</span>
                    <span className="size14r gray fr">{data.subscribeNum}订阅</span>
                </div>
            </div>
        </div>
    }
}
