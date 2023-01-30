// 按钮事件
var btnAct = {};
// 弹框
var winObj = null;
var openType = '';
var chooseData = {};
var layer, table;
var reload;
layui.use(function () {
    table = layui.table;
    layer = layui.layer;

    

    //展示已知数据
    table.render({
        elem: '#user',
        cols: [
            [ //标题栏
                {
                    field: 'ID',
                    title: 'ID',
                    width: 80,
                    sort: true
                }, {
                    field: 'UserName',
                    title: 'Book',
                    width: 80
                }, {
                    field: 'RealName',
                    title: '姓名',
                    width: 100,
                    sort: true
                }, {
                    field: 'Pwd',
                    title: '密码',
                    width: 100
                }, 
                {
                    field: 'Power',
                    title: '权限',
                    width: 100
                }, 
                {
                    field: 'CreateTime',
                    title: 'Price',
                    width: 100
                }, {
                    field: 'UpdateTime',
                    title: '修改时间',
                    width: 100
                }, {
                    field: "",
                    title: "",
                    width: 150,
                    templet: '#btn'
                }
            ]
        ],
       /* data: [],
        even: true,
        page: true, //是否显示分页
        limit: 10 //每页默认显示的数量*/
        parseData: function (res) {
            console.log(res);
            return {
                "code": 0,
                "msg": "",
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
            fixed: false, //不固定
            maxmin: true,
            content: 'http://localhost:57256/Home/UserDetail'
        });
    }

    reload = function () {
        // 此处调用查询接口
        $.ajax({
            url: "/Home/GetUserList",
            data: {
                keyWord: ""
            },
            success: function (res) {
                var data = JSON.parse(res);
                // 获取到 data
                table.reload('user', {
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
                    url: "/Home/DelUser",
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
        if (id) {
            // 此处调用 查询单条记录
            // $.ajax();
            // demo 写死
            //openType = type;
            $.ajax({
                url: "/Home/GetSingleUser",
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