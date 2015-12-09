'use strict';

export default function( state = 'Hello Yes!', action ) {
    if( action.type !== 'add_message' )
        return state;

    return action.message;
}
