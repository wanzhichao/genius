let baseURL = '../data/';

function getAjax(settings) {
    $.ajax({
        url: settings.url,
        data: settings.data || {},
        type: settings.type || "get",
        dataType: settings.dataType || "json",
        success: function (data) {
            settings.success && settings.success(data);
        },
        error: function () {
            settings.error && settings.error();
        }
    })
}

const proHub = {
    //统一请求接口
    requestForData: function(url, callback) {
        getAjax({
            "url": baseURL + url,
            "success": function (data) {
                callback(data);
            }
        })
    },
    jijin: function (param,callback){ //index数据
        var url = '../data/celue.json';
        // var url = "http://schoolbt.jd.com/btSchool/main/toMain?t="+ Math.random();
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            // contentType:"application/json",
            data:param,
            success: function (data) {
                callback && callback(data);
            }
        });
    }
}


export default proHub;