import React, {useContext} from 'react';
import Loading from '../../../loading/Loading';
import AuthContext from '../../../../contexts/AuthContext';

const MyUser = ({group, reloadItemGroupDetails}) => {
    let {user} = useContext(AuthContext);

    const showUser = () => {
        if(group.user1 === null && group.user2 === null){
            reloadItemGroupDetails();}

        if(group.user1 !== null && group.user1 === user.user_id){
            return group.user1_username;
        }

        else if(group.user2 !== null && group.user2 === user.user_id){
            return group.user2_username;
        }
    }

    return(
        <div>
            {showUser()}
            {group.user1 === null && group.user2 === null &&
                <Loading />
            }
        </div>
    )
}

export default MyUser;