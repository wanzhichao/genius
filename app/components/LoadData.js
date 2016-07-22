import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class LoadData extends Component{
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
        return <div>
            <div className={isShow ? "load-data load-circle " : "load-data load-circle  load-anim"}>
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
