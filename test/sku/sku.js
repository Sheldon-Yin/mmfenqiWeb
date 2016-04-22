/**
 * Created by sheldon on 2016/4/22.
 */
/* 后端数据 */
var data = {
    "10;20;30": {
        price: 5,
        count: 1
    },
    "10;20;31": {
        price: 10,
        count: 2
    },
    "11;20;30": {
        price: 5,
        count: 1
    },
    "10;21;31": {
        price: 10,
        count: 2
    },
    "10;21;32": {
        price: 10,
        count: 9
    }
};

var myData = {},

//可选项key值
    keys = [
        [10, 11, 12],
        [20, 21],
        [30, 31, 32]
    ];

//获取 key的库存量

function getNum(key) {
    var result = 0,

        i, j, m,

        items, n = [];

    //检查是否已计算过
    if (typeof myData[key] != 'undefined') {
        return myData[key];
    }

    items = key.split(";");

    //已选择数据是最小路径，直接从已端数据获取
    if (items.length === keys.length) {
        return data[key] ? data[key].count : 0;
    }

    //拼接子串
    for (i = 0; i < keys.length; i++) {
        for (j = 0; j < keys[i].length && items.length > 0; j++) {
            if (keys[i][j] == items[0]) {
                break;
            }
        }

        if (j < keys[i].length && items.length > 0) {
            //找到该项，跳过
            n.push(items.shift());
        } else {
            //分解求值
            for (m = 0; m < keys[i].length; m++) {
                result += getNum(n.concat(keys[i][m], items).join(";"));
            }
            break;
        }
    }

    //缓存
    myData[key] = result;
    return result;
}

document.write(getNum("10") + ";"); //输出14
document.write(getNum("11") + ";"); //输出1
document.write(getNum("10;21") + ";"); //输出11
document.write(getNum("21;31") + ";"); //输出2​