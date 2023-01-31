layui.use(function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    laydate.render({
    });
    form.val("addForm", parent.chooseData);
    form.on('submit(sub)', function (data) {
        var type = parent.openType;
        var data = data.field;
        if (type === 'add') {
            $.ajax({
                url: "/Home/InsertSingleGood",
                data: data,
                success: function (res) {
                    parent.reload();
                    parent.layer.close(parent.winObj);
                }
            });

        } else if (type == 'Reserve') {
            data.ID = parent.chooseData.ID;
            parent.reserved();
            parent.reload();

            // 提交完毕  调用列表查询 关闭弹框
         /*   $.ajax({
                url: "/Home/UpdateSingleGood",
                data: data,
                success: function (res) {
                    parent.reload();
                    parent.layer.close(parent.winObj);
                }
            });

        } else {
            parent.layer.close(parent.winObj);
        }
        return false;*/
    });
})