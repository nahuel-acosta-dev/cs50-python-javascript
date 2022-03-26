import React, {useContext} from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import Loading from '../../../../loading/Loading';

const MyUser = ({group}) => {
    let {user} = useContext(AuthContext);

    const reloadItemGroupDetails = () => {
        for(let i = 0; i < 3;i++){
            (function(i){
                let myInterval = setInterval(() => getGroupDetails(), 5000);

                if(group.user1 !== null && group.user1 === user.user_id){
                    clearInterval(myInterval);}

                else if(group.user2 !== null && group.user2 === user.user_id){
                    clearInterval(myInterval);}

                if(i === 2 && group.user1 === null && group.user2 === null){
                    return <span>A mistake occurred when trying to join the group</span>}
            })(i);
        }
    }

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