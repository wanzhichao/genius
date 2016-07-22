import React, { Component, PropTypes } from 'react'
import ProHub from '../utils/ProHub'
import StockBox from '../components/StockBox'
import Loading from '../components/Loading'
import {Link} from 'react-router'

export default class FinancialAdvisor extends Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            isAnim: false,
            fundData: {
                "canSubscribe": [
                ]
            }
        }
    }
    componentDidMount = () => {
        let self = this;
        if(window.data.advisorState === this.props.location.state) {
            this.setState({
                loaded: true,
                fundData: window.data.advisor
            });
            setTimeout(function() {
                self.setState({
                    isAnim: true
                });
            },100)
        }else{
            ProHub.requestForData("advisor.json", function(data) {
                this.setState({
                    loaded: true,
                    isAnim: true,
                    fundData: data.data
                });
                window.data.advisorState = this.props.location.state;
                window.data.advisor = data.data;
            }.bind(this));
        }

    };
    render(){
        let fundData = this.state.fundData.canSubscribe;

        return <div>
            <div className={this.state.isAnim ? "scale-box bg-gray fullLayer abs":"bg-gray fullLayer abs vb-hide"}>
                <header className="advisor-header size12r">
                    <div className="advisor-box flexbox">
                        <div className="advisor-img">
                            <img src="../images/person-img.png" alt=""/>
                        </div>
                        <div className="flexbox-item over-hide ml10r">
                            <h3 className="size20r mt15r">万智超</h3>
                            <p className="advisor-title ellipsis">京东金融前端开发工程师</p>
                        </div>
                    </div>
                    <div className="mt15r flexbox">
                        <div className="flexbox-item pr ta-c">
                            <h3 className="gray">成功率</h3>
                            <h4 className="mt5r size18r">50%</h4>
                        </div>
                        <div className="flexbox-item pr lr-border ta-c">
                            <h3 className="gray">平均收益率</h3>
                            <h4 className="mt5r size18r">52%</h4>
                        </div>
                        <div className="flexbox-item pr ta-c">
                            <h3 className="gray">成功次数</h3>
                            <h4 className="mt5r size18r">32</h4>
                        </div>
                    </div>
                </header>
                <div className="pb20r bg-gray pr">
                    {fundData.map(function(ele, i) {
                        return <StockBox type="1"  data={ele} key={i}></StockBox>;
                    })}
                </div>

            </div>
            <Loading isShow={this.state.loaded}></Loading>
            </div>

    }
}
