import React, { Component, PropTypes } from 'react';
import ProHub from '../utils/ProHub'
import StockBox from '../components/StockBox'
import Loading from '../components/Loading'

export default class MySubscribe extends Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            fundData: {
                "canSubscribe": [
                ]
            }
        }
    }
    componentDidMount = () => {
        ProHub.requestForData("advisor.json",function(data) {
            this.setState({
                loaded: true,
                fundData: data.data
            });
        }.bind(this));
    };
    render(){
        let fundData = this.state.fundData.canSubscribe;

        return <div>
            <div className={this.state.loaded ? "scale-box bg-gray fullLayer abs" : "bg-gray fullLayer abs vb-hide"}>
                <div className="pb20r bg-gray pr">
                    {fundData.map(function(ele, i) {
                        return <StockBox type="2"  data={ele} key={i}></StockBox>;
                    })}
                </div>
            </div>
            <Loading isShow={this.state.loaded}></Loading>
        </div>
    }
}
