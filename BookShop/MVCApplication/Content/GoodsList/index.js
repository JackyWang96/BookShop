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
            url: "/Home/GetBooksList",
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

    btnAct = function (type, id) {
        openType = type;
        if (type == 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: "/Home/DelGoods",
                    data: {
                        ID: id
                    },
                    success: function (res) {
                        // 调用删除接口
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

        if (id) {
            // 此处调用 查询单条记录
            // $.ajax();
            // demo 写死
            //openType = type;
            $.ajax({
                url: "/Home/GetSingleGood",
                data: {
                    ID: id
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    chooseData = data;
                }
            });
        } else {
            chooseData = {};
        }
        open();
    }
    reload();

});