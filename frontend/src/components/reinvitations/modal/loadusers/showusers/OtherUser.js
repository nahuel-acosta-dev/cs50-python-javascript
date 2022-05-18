import React from 'react';
import Loading from '../../../../loading/Loading';

const OtherUser = ({group, myUser}) => {

    const loadingOtherUser = () => {
        if(group.user1 === null && group.user2 === null){
            return <Loading />;
        }
        else if(group.user1 === myUser && group.user2 === null){
            return <Loading />;
        }
        else if(group.user1 === null && group.user2 == myUser){
            return <Loading />;
        }
        else if(group.user1 == myUser && group.user2 !== null){
            return group.user2_username;
        }

        else if(group.user1 !== null && group.user2 == myUser){
            return group.user1_username;
        }
        else return <Loading />;
    }

    return loadingOtherUser();

        
}

export default OtherUser;