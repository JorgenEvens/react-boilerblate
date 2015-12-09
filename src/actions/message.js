'use strict';

let i = 0;
const messages = [
    'Hello World!',
    'Hello Planet!',
    'Hello developer!'
];

export default {
    add() {
        i = ++i % 3;
        return {
            type: 'add_message',
            message: messages[i]
        };
    }
};
