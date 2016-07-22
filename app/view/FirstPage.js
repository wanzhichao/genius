import React, { Component, PropTypes } from 'react'
import ProHub from '../utils/ProHub'
import {Router,Link} from 'react-router'
import InvestBox from '../components/InvestBox'
import Loading from '../components/Loading'
import LoadData from '../components/LoadData'

let currentIndex = "canSubscribe";
class FirstPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false, //初始数据是否加载
            canSubscribe: [
            ],
            working: [
            ],
            completed: [
            ],
            type: "canSubscribe",//订阅状态
            dataLoaded: true //投资内容数据
        }
    }
    clickHandler = (e) => {
        let self = this;
        let type = e.target.getAttribute("alt");

        this.setState({
            dataLoaded: false,
            canSubscribe: [
            ],
            working: [
            ],
            completed: [
            ]
        }, function() {
            if(type != currentIndex) { //本次点击和上次点击的tab不一样
                if(!window.data[type]){ //是否已经请求过该数据
                    ProHub.requestForData(type+".json", function(data) {
                        //更新state
                        self.state[type] = data.data;
                        window.data[type] = data.data; //将数据保存
                        self.setState({
                            type: type,
                            loaded: true
                        })
                        setTimeout(function() {
                            self.setState({
                                dataLoaded: true
                            })
                        },500)
                    });
                }else{
                    self.state[type] = window.data[type]; //请求过则使用本地数据
                    self.setState({
                        type: type,
                        dataLoaded: true
                    })
                }
                currentIndex = type;

            }
        });


    };
    componentDidMount = () =>{
        $("#loading").remove();//删除原来loading页面
        if(window.data.canSubscribe) {
            this.setState({
                loaded: true,
                canSubscribe: window.data.canSubscribe
            });
        }else{
            ProHub.requestForData("canSubscribe.json", function(data) {
                this.setState({
                    loaded: true,
                    canSubscribe: data.data
                });
                window.data.canSubscribe = data.data;
            }.bind(this));
        }

    };

    render(){
        let subscribeType = this.state.type;
        let fundData = this.state.canSubscribe;
        if(this.state.type == "working") {
            fundData = this.state.working;
        }else if(this.state.type == "completed") {
            fundData = this.state.completed;
        }else{
            fundData = this.state.canSubscribe;
        }
        return <div className="bg-black fullLayer abs">
            <div>
                <header className="header pr ta-c">
                    <div><span className="main-title white inline-block">牛人策略</span></div>
                    <span className="sub-title">汇集最强牛人，出品金牌策略</span>
                    <nav className="finish-state flexbox">
                        <div alt="canSubscribe" onClick={this.clickHandler} className={this.state.type == "canSubscribe" ? "flexbox-item ta-c red" : "flexbox-item ta-c"}>已订阅</div>
                        <div alt="working" onClick={this.clickHandler} className={this.state.type == "working" ? "flexbox-item ta-c pr lr-border red" : "flexbox-item ta-c pr lr-border"}>运行中</div>
                        <div alt="completed" onClick={this.clickHandler} className={this.state.type == "completed" ? "flexbox-item red ta-c" : "flexbox-item ta-c"}>已完成</div>
                    </nav>
                </header>
                <div className="cont">
                    <LoadData isShow={this.state.dataLoaded}></LoadData>
                    {fundData.map(function(ele, i) {
                        return <Link to={{pathname:"/detail", state: i}}  key={i}><InvestBox type={subscribeType} index={i} data={ele}></InvestBox></Link>;
                    })}
                </div>
                <Link to="/mySubscribe" activeClassName="active">
                    <div  className="snake-bar">
                        <div className="fullLayer my-info flex-mm">
                            <div className="ta-c white size15r">我的<br />订阅</div>
                        </div>
                    </div>
                </Link>
                <Loading isShow={this.state.loaded}></Loading>
            </div>

        </div>
    }
}
export default FirstPage
