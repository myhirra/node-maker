/**
 * 日期格式化：将日期对象转换为pattern对应的字符串
 * @author zhaoxianlie
 * @param source  日期对象
 * @param pattern   日期格式化规则，默认：yyyy-MM-dd
 */
exports.format = function(source,pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }
    if(!(source instanceof Date)) {
        source = new Date(source);
    }

    if(!pattern) {
        pattern = 'yyyy-MM-dd';
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }

    var pad = function (source,length) {
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));

        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }

        return (negative ?  "-" : "") + pre + string;
    };

    var year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};