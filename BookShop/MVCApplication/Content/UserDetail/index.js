layui.use(function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    laydate.render({
        //elem: '#birth' //指定元素
    });
    // 赋值回填
    form.val("addForm", parent.chooseData);
    //监听提交
    form.on('submit(sub)', function (data) {
        var type = parent.openType;
        // 表单数据
        var data = data.field;
        if (type === 'add') {
            // 提交完毕  调用列表查询 关闭弹框
            $.ajax({
                url: "/Home/InsertSingleUser",
                data: data,
                success: function (res) {
                    parent.reload();
                    parent.layer.close(parent.winObj);
                }
            });
            
        } else if (type == 'edit') {
            // 赋值主键id
            data.ID = parent.chooseData.ID;
            // 提交完毕  调用列表查询 关闭弹框
            $.ajax({
                url: "/Home/UpdateSingleUser",
                data: data,
                success: function (res) {
                    parent.reload();
                    parent.layer.close(parent.winObj);
                }
            });
            
        } else {
            parent.layer.close(parent.winObj);
        }
        return false;
    });
})