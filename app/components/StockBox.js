import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router'

export default React.createClass({

    render(){
        let {data, type} = this.props,
            successState = "",
            leftTxt = "目标收益", //内容栏左侧文案
            rightTxt = "计划天数", //内容栏右侧文案
            leftCont = "", //内容栏左侧内容
            rightCont = "", //内容栏右侧内容
            canSubscribe = "";
        if(data.fundState == "未开始") {
            successState = "ready";
            leftTxt = "目标收益";
            rightTxt = "计划天数";
            leftCont = data.incomeRate;
            rightCont = data.incomeDay + "天";
            canSubscribe = <Link to="/result"><span className="can-subscribe-btn"><span className="font-bold add-icon">+</span> 订阅</span></Link>;
        }else if(data.fundState == "运行中") {
            successState = "runing";
            leftTxt = "当前收益";
            rightTxt = "目标收益";
            leftCont = data.currentRate;
            rightCont = data.targetRate + "%";
            canSubscribe = <span className="can-subscribe-btn hasSubscribe">已订阅</span>
        }else{
            successState = "fail";
            leftTxt = "最高收益";
            rightTxt = "目标收益";
            leftCont = data.mostRate;
            rightCont = data.targetRate + "%";
        }

        return <div className="advisor-invest-box bg-white pr black">
            {type == "2" ? "":canSubscribe}
            <p className="size17r pl15r">{data.fundName} <span className={classNames("complete size10r white ta-c", successState)}>{data.fundState}</span></p>
            <div className="flexbox mt20r border-b pb20r">
                <div className="flexbox-item pr pl15r border-r">
                    <p className="gray size12r">{leftTxt}</p>
                    <p className="size26r red mt10r">{leftCont}%</p>
                </div>
                <div className="pr pl15r flexbox-item">
                    <p className="gray size12r">{rightTxt}</p>
                    <p className="size26r mt10r">{rightCont}</p>
                </div>
            </div>
            <div className="box-footer">
                <div className="footer-cont pr">
                    <span className="size14r gray">{data.subscribeNum}订阅</span>
                </div>
            </div>
        </div>
    }
})
