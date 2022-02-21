
const ResponseService = (response, setItem, logoutUser) => {
    if(response.status === 200)setItem(response.data);
    else if(response.statusText === 'Unauthorized')logoutUser();
}

export default { 
    Response:ResponseService,
  }