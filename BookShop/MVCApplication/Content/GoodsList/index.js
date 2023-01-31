//Button events
var btnAct = {};
var search = {};
var SearchUser = {};

var winObj = null;
var openType = '';
var chooseData = {};
var layer, table;
var reload;

layui.use(function () {
    table = layui.table;
    layer = layui.layer;



    //Show Book data
    table.render({
        elem: '#demo',
        url: 'http://localhost:57256//Home/GetBooksList',
        cols: [
            [ 
                {
                    field: 'ID',
                    title: 'ID',
                    width: 80,
                    sort: true
                }, {
                    field: 'BookName',
                    title: 'BookName',
                    width: 250
                }, {
                    field: 'BSB',
                    title: 'BSB',
                    minWidth: 120,
                }, {
                    field: 'Reservation',
                    title: 'Reservation Status',
                    minWidth: 120,
                },{
                    field: "",
                    title: "",
                    width: 150,
                    templet: '#btn'

                }
            ]
        ],
        parseData: function (res) {
            console.log(res);
            return {
                "code": 0,
                "msg": "",
                "count": 3,
                "data": res,
                "even": true,
                "page": true, //是否显示分页
                "limit": 10 //每页默认显示的数量
            }
        }
        
    });

    function open() {
        winObj = layer.open({
            type: 2,
            area: ['800px', '450px'],
            fixed: false, 
            maxmin: true,
            content: 'http://localhost:57256/Home/GoodsDetail'
        });
    }

    search = function () {
        var searchCondition = $('#searchCondition').val();
        $.ajax({
            url: "/Home/GetGoodsList",
            data: {
                keyWord: searchCondition
            },
            success: function (res) {
                var data = JSON.parse(res);
                table.reload('demo', {
                    data: data
                }, true)
            }
        });
    }

    SearchUser = function () {
        winObj = layer.open({
            type: 2,
            area: ['1000px', '500px'],
            fixed: false, 
            maxmin: true,
            content: 'http://localhost:57256/Home/UserList'
        });
    }



    reload = function () {
        // 此处调用查询接口
        $.ajax({
            url: "http://localhost:57256//Home/GetBooksList",
            data: {
                keyWord: ""
            },
            success: function (res) {
                var data = JSON.parse(res);
                console.log(data);
                // 获取到 data
                table.reload('demo', {
                    code: 0,
                    msg: "",
                    count: 3,
                    data: data
                }, true)
            }
        });
    }

    reserved = function () {
        $.ajax({
            url: "http://localhost:57256//Home/ReservedBook",
            data: {
                keyWord: ""
            },
            success: function (res) {
                var data = res;
                console.log(data);
                // 获取到 data
                table.reload('demo', {
                    code: 0,
                    msg: "",
                    count: 3,
                    data: data
                }, true)
            }
        });
    }

    btnAct = function (type, id) {
        openType = type;
        if (type == 'cancel') {
            layer.confirm('Are you sure you want to cancel the reservation?', {
                title: "Notification",
                btn: ['Confrim', 'Cancel']
            },function(index) {
                $.ajax({
                    url: "/Home/CancelReservedBook",
                    data: {
                        ID: id
                    },
                    success: function (res) {
                        reload();
                        layer.close(index);
                    }
                });
            });
            return
        }

        if (type == "SearchUser") {
            winObj = layer.open({
                type: 2,
                area: ['800px', '450px'],
                fixed: false, //不固定
                maxmin: true,
                content: 'http://localhost:44388/Home/UserList'
            });
        }

        if (type == 'reserve') {
            layer.confirm('Are you sure you want to reserve this book?', {
                title: "Notification",
                btn: ['Confrim', 'Cancel']
            },function (index) {
                $.ajax({
                    url: "/Home/ReservedBook",
                    data: {
                        ID: id
                    },
                    success: function (res) {
                        reload();
                        $('#reserve').addClass("layui-btn-disabled").attr("disabled", true);
                       
                        
                        layer.close(index);
                        $('btn').attr("disabled", true).addClass("layui-btn-disabled");
                    }
                });
            });
            return
        } else {
            chooseData = {};
        }
        open();
    }
    reload();

});