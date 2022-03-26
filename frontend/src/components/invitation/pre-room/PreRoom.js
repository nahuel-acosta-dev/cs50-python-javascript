import React, {useEffect} from 'react';
import ReadyRoom from './ReadyRoom';
import Loading from '../../loading/Loading';

const PreRoom = ({groupDetails, setHide}) =>{
  console.log(groupDetails)
    
  useEffect(() =>{
    setHide(true);

    return () => setHide(false);
  },[])

    return(
        <>
            {!groupDetails ?
              <Loading />:
            <>
              <ReadyRoom groupDetails={groupDetails}/>
            </>}
        </>
        
    )

}

export default PreRoom;