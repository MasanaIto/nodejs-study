'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');
// csvファイルから読み込みを行うStreamを生成
const rs = fs.createReadStream('./popu-pref.csv');
// readlineオブジェクトのinputとして設定し、rlオブジェクトを作成
const rl = readline.createInterface({ input: rs, output: {} });
// key: 都道府県 value: 集計データのオブジェクト
const prefectureDataMap = new Map();

// rlオブジェクトでlineイベントが発生したら実行
// 2010 年と 2015 年の際の集計年、都道府県、15〜19 歳の人口がコンソール上に出力
rl.on('line', lineString => {
    const columns = lineString.split(',');
    // 集計年 parseInt...文字列を整数値に変換する関数
    const year = parseInt(columns[0]);
    // 都道府県
    const prefecture = columns[1];
    // 15〜19 歳の人口
    const popu = parseInt(columns[3]);

    if (year === 2010 || year === 2015) {
        let value = prefectureDataMap.get(prefecture);
        if (!value) {
            value = {
                popu10: 0,
                popu15: 0,
                change: null
            };
        }
        // 人口のデータを連想配列に保存
        if (year === 2010) {
            value.popu10 = popu;
        }
        if (year === 2015) {
            value.popu15 = popu;
        }
        prefectureDataMap.set(prefecture, value);
    }
});

rl.on('close', () => {
    for (const [key, value] of prefectureDataMap) {
        // 人口の変化率
        value.cahnge = value.popu15 / value.popu10;
    }
    console.log(prefectureDataMap);
});
