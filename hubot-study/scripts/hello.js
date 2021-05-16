'use strict';
module.exports = robot => {
    // /hello>/i...大文字小文字を問わず hello> という文字にマッチする正規表現
    robot.hear(/hello>/i, msg => {
        const user_id = msg.message.user.id;
        msg.send(`Hello, <@${user_id}>`);
    });
};
