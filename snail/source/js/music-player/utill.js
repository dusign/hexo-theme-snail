class Util {
    constructor() {
        if (Util.instance) return Util.instance;
        return this.getInstance(...arguments);
    }

    getInstance() {
        var instance = {
            /*
             *   formatTime 格式化时间（s）为 hour:minutes:seconds
             *   @params  time  required number (s)
             *   
             *   return hour:minutes:seconds string
             */

            formatTime(time) {
                //没有传time的时候
                if (time === undefined) {
                    this.handlerError(123, {
                        method: 'formate',
                        param: 'time'
                    });
                    return false;
                }
                let _time = Math.floor(time);
                let _minutes = Math.floor(_time / 60);
                let _hours = Math.floor(_minutes / 60);
                let _seconds = _time - (_minutes * 60);

                return (_hours ? this.fillZero(_hours) + ':' : '') + this.fillZero(_minutes - (_hours * 60)) + ':' + this.fillZero(_seconds);
            },
            /*
             *   fillZero 为小于10的数字补0
             *   @params  num  required number
             *   return '01'.. string
             */
            fillZero(num) {
                //当没有传time的时候
                if (num === undefined) {
                    this.handlerError(123, {
                        method: 'fillZero',
                        param: 'num'
                    });
                    return false;
                }
                //这个函数只是让我们在渲染/显示的时候有一个不同的效果，不要操作原数据
                return num > 9 ? num : '0' + num;
            },
            errors: {
                123: ({
                    method,
                    param
                }) => {
                    return method + 'function need a param ' + param;
                }
            },
            handlerError(code, options) { //处理报错
                console.error('[until error] message' + this.errors[code](options));
            }
        }
        Util.instance = instance;
        return instance;
    }
}

//为了这个工具以后在模块化环境中依然可以使用，需要判断一下，如果是在模块化环境，就将其暴露出去
//commonJs
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Util;
}

//AMD
if (typeof define === 'function' && define.amd) {
    define('util', [], function () {
        return Util;
    });
}