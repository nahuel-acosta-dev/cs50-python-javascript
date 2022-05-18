import React, {useContext, useEffect} from 'react';
import Loading from '../../../../loading/Loading';

const MyUser = ({group, myUser, getGroupDetails}) => {

    const showUser = () => {
        if(group.user1 === null && group.user2 === null)setTimeout(() => getGroupDetails(), 5000)

        if(group.user1 !== null && group.user1 === myUser){
            return group.user1_username;
        }

        else if(group.user2 !== null && group.user2 === myUser){
            return group.user2_username;
        }
    }

    useEffect(() => {
        if(group.user1 === null && group.user2 === null)setTimeout(() => getGroupDetails(), 5000)
        else if(group.user1 === null || group.user2 === null)setTimeout(() => getGroupDetails(), 5000)
    }, [])

    return(
        <div>
            {/*group.user1 !== null && group.user1 == myUser ?
                (group.user1_username)
                :
                (group.user2 !== null && group.user2 == myUser &&
                group.user2_username)*/
                showUser()
            }
            {group.user1 === null && group.user2 === null &&
                <Loading />
            }
        </div>
    )
}

export default MyUser;