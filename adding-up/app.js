'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');

// csvファイルから読み込みを行うStreamを生成
const rs = fs.createReadStream('./popu-pref.csv');
// readlineオブジェクトのinputとして設定し、rlオブジェクトを作成
const rl = readline.createInterface({ input: rs, output: {} });

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
        console.log(year);
        console.log(prefecture);
        console.log(popu);
    }
});
