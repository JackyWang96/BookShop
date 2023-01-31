layui.define(['layer'], function (exports) {
    "use strict";

    var $ = layui.jquery,
		layer = layui.layer;

    var common = {

        /**
         * 
         * @param {String} str
         */
        loadStyles: function (str) {
            loadStyles.mark = 'load';
            var style = document.createElement("style");
            style.type = "text/css";
            try {
                style.innerHTML = str;
            } catch (ex) {
                style.styleSheet.cssText = str;
            }
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(style);
        },

        /**
         * throw an error
         * @param {String} msg
         */
        throwError: function (msg) {
            if (layer && layer != undefined) {
                layer.msg(msg, { icon: 5 });
            }
            throw new Error(msg);
            return;
        }
    };
    exports('common', common);
});