import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        //样式
        loadingClass: PropTypes.string
    };
    //默认props
    static defaultProps = {
        loadingClass: ''
    };

    render(){
        let {loadingClass,isShow} = this.props;
        return <div className={isShow ? "fullLayer bg-gray abs-lt hide" : "fullLayer bg-gray abs-lt"}>
            <div className={classNames("loading abs-mm", loadingClass)}>
                <div className="spinner abs-mm">
                    <div className="spinner-container container1">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container2">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container3">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
