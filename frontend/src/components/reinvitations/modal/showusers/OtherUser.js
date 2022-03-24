import React, {useContext} from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import Loading from '../../../loading/Loading';

const OtherUser = ({group, reloadItemGroupDetails}) => {
    let {user} = useContext(AuthContext);

    const loadingOtherUser = () => {
        if(group.user1 === null && group.user2 === null){
            return <Loading />;
        }
        else if(group.user1 === user.user_id && group.user2 === null){
            return <Loading />;
        }
        else if(group.user1 === null && group.user2 === user.user_id){
            return <Loading />;
        }
        else if(group.user1 === user.user_id && group.user2 !== null){
            return group.user2_username;
        }

        else if(group.user1 !== null && group.user2 === user.user_id){
            return group.user1_username;
        }
        else return <Loading />;
    }

    return(
        <div>
            {loadingOtherUser()}
        </div>
    )

}

export default OtherUser;