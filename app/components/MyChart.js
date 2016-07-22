/**
 * @Author: Created by wanzhichao on 2016/7/16.
 * @Mail: wanzhichao@jd.com
 */

import React from 'react';
import DrawChart from '../utils/DrawChart';
export default React.createClass({
    componentDidUpdate() {

        DrawChart.stockKLine();
    },
    render()
    {
        return (
            <div className="stockLine">
            </div>
        )
    }
})