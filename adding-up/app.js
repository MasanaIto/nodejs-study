// 2010年から 2015年にかけて 15〜19歳の人が増えた割合の 都道府県ランキング

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
        value.change = value.popu15 / value.popu10;
    }
    // 変化率ごとに並び替える
    // Array.from()...Mapを普通の配列に変換
    const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
    });
    
    // map関数[配列.map(関数)]...Arrayの要素それぞれを、与えられた関数を適用した内容に変換する
    const rankingStrings = rankingArray.map(([key, value]) => {
        return (
            key + ': ' + value.popu10 + '=>' + value.popu15 + ' 変化率:' + value.change
        );
    });
    console.log(rankingStrings);
});
