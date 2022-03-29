import React, {useContext} from 'react';
import Loading from '../../../../loading/Loading';

const MyUser = ({group, myUser}) => {

    /*const reloadItemGroupDetails = () => {
        for(let i = 0; i < 3;i++){
            (function(i){
                if(group.user1 !== null && group.user2 !== null)return true;
                
                let myInterval = setInterval(() => getGroupDetails(), 5000);

                if(group.user1 !== null && group.user1 === user.user_id){
                    clearInterval(myInterval);}

                else if(group.user2 !== null && group.user2 === user.user_id){
                    clearInterval(myInterval);}

                if(i === 2 && group.user1 === null && group.user2 === null){
                    return <span>A mistake occurred when trying to join the group</span>}
            })(i);
        }
    }*/

    /*const showUser = () => {
        //if(group.user1 === null && group.user2 === null){reloadItemGroupDetails();}

        if(group.user1 !== null && group.user1 === user.user_id){
            return group.user1_username;
        }

        else if(group.user2 !== null && group.user2 === user.user_id){
            return group.user2_username;
        }
    }*/

    return(
        <div>
            {group.user1 !== null && group.user1 == myUser ?
                (group.user1_username)
                :
                (group.user2 !== null && group.user2 == myUser &&
                group.user2_username)
            }
            {group.user1 === null && group.user2 === null &&
                <Loading />
            }
        </div>
    )
}

export default MyUser;