import React, {useContext} from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import Loading from '../../../../loading/Loading';

const OtherUser = ({group, myUser, otherUser}) => {

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
        else return <span>An error occurred while trying to show user 2</span>;
    }

    //return loadingOtherUser();

    return (
        <>
       {!otherUser ?
        (<Loading />) :
        (<span>{otherUser}</span>)}</>
    )
        
}

export default OtherUser;