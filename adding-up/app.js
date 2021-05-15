'use strict';
// モジュール呼び出し
const fs = require('fs');
const readline = require('readline');

// csvファイルから読み込みを行うStreamを生成
const rs = fs.createReadStream('./popu-pref.csv');
// readlineオブジェクトのinputとして設定し、rlオブジェクトを作成
const rl = readline.createInterface({ input: rs, output: {} });

// rlオブジェクトでlineイベントが発生したら実行
rl.on('line', lineString => {
    console.log(lineString);
});
