const API = "http://127.0.0.1:8000/api";

const Following = (props) =>{
    const mi_user = props.user;
    const [following, setFollowing] = React.useState([]);
    const [posts, setPost] = React.useState([]);
    const followingPosts = [];

    //We get all currently activated posts
    const allFollowing = () => {
        fetch(`${API}/following`)
        .then(response => response.json())
        .then(data => {
            setFollowing(data)
        })
        .catch(error => console.log(error))
    }

    const allPost = () => {
        fetch(`${API}/posts/all`)
        .then(response => response.json())
        .then(data => {
            setPost(data)
        })
        .catch(error => console.log(error))
    }

        following.map(userFollowing => {
            posts.map(post =>{
                if(userFollowing.user_following_id === post.user_id) {
                    followingPosts.push(post);
                }
            })
        } )
    

    /*We save in another function the data sent from the parent component App,
    to give them to the IndividualPost component and we hope to receive the desired data by
    the parent component*/
    const pasar = (user) =>{
        console.log("Se paso");
        const getUser = user;
        props.getUser(getUser);
    }

    React.useEffect(() => {
        allFollowing();
        allPost();
    }, [])

    followingPosts.sort(function(a, b) { 
        a = new Date(a.date); 
        b = new Date(b.date); 
        return a>b ? -1 : a<b ? 1 : 0; });


    return(
        <div>
            <IndividualPost posts={followingPosts} user={mi_user} allPost={allPost}
                HandleChange={props.HandleChange} getUser={pasar} />
        </div>
    )
}

const ButtonFollowing = (props) =>{
    const [mi_following, setMiFollowing] = React.useState([]);
    const [counterFollowing, setCounterFollowing] = React.useState([]);
    const user = props.user;
    const mi_user = props.mi_user;

    //We obtain the number of people that the user we are in follows
    const dataMiFollowing = () =>{
        fetch(`${API}/following/user/${user.id}/all`)
        .then(response => response.json())
        .then(data => {
            setMiFollowing(data)
        })
        .catch(error => console.log(error))
    }

    //We obtain the number of followers of the user in which we are
    const counterFollows = () => {
        fetch(`${API}/following/userfollowing/${user.id}`)
        .then(response => response.json())
        .then(data => setCounterFollowing(data))
        .catch(error => console.log(error))
    }
    

    React.useEffect(() =>{
        dataMiFollowing();
        counterFollows();
    }, []);


    return(
        <>
            <div className="name">
                <h2>{user.username}</h2>
                <div className="row">
                    <div className="col">Siguiendo {mi_following.length}</div>
                    <div className="col">Seguidores {counterFollowing.length}</div>
                </div>
            </div>
            <div>
                {user.id != mi_user.id &&
                <CreateFollower key={user.id} user={user} counter={counterFollows} />
                }
            </div>    
        </>

    )
}

const Perfil = (props) => {
    const [mi_posts, setMiPost] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postPerPage] = React.useState(10);
    const mi_user = props.user;
    const user = props.valor;

    //We obtain all the posts of the profile in which we are
    const Mipost = () => {
        fetch(`${API}/posts/user/${user.id}/all`)
        .then(response => response.json())
        .then(data => {
            setMiPost(data)
        })
        .catch(error => console.log(error))
    }

    React.useEffect(() =>{
        Mipost();
    }, []);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = mi_posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    return (
        <div>
            <ButtonFollowing key={user.id} user={user} mi_user={mi_user}/>
            <div>
            {user.id == mi_user.id &&
            <CreatePost user={mi_user} />
            }
            {currentPosts.map((mi_post) => (
                <div className={"post container-fluid"}>
                    <div className="row">
                    <p className={"fecha-post col"}><span className="post-date">{mi_post.date}</span></p>
                    {mi_user.id == mi_post.user_id &&
                        <div className="dropdown col-2">
                            <button className="btn dropdown-toggle btn-dpd" type="button" id="dropdownMenu2" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-list"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><button className="dropdown-item" type="button" data-bs-toggle="modal" 
                                data-bs-target={`#form-modal${mi_post.id}`}>Edit{mi_post.id}</button></li>
                            </ul>
                            <EditPost key={mi_post.id} allPost={Mipost} post={mi_post} />
                        </div>
                    }
                    </div>
                    
                    <div>
                        <p>{mi_post.body}</p>
                    </div>
                    <div className={"cont-btn"}>
                        <ButtonLike post={mi_post}/>
                    </div>
                </div>
            ))}
            <Pagination postPerPage={postPerPage}
            totalPosts={mi_posts.length} paginate={paginate} />
            </div>
        </div>
    )
}

const CreateFollower = (props) =>{
    const [stateButton, setFollower] = React.useState({state: false,
    button: null
    })
    const user = props.user;

    //We obtain all the followers and followed of the profile in which we are
    const dataFollows = () => {
        fetch(`${API}/following/all`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            props.counter(data);
        })
        .catch(error => console.log(error))
    }

    //we get the status of the follow button
    const stateButtonFollower = () => {
        fetch(`${API}/following/user/${user.id}`)
        .then(response => response.json()
        )
        .then(data => {
            if(data.id === undefined || data.activate==false) {setFollower({
                ...stateButton,
                state:false,
                button: 'follow'
            });}
            else {setFollower({
                ...stateButton,
                state:true,
                button: 'stop following'
            });
            }
            console.log(stateButton);
        }
        )
        .catch(error => console.log(error))
    }

    /*if we press the follow button, and the user logged in never followed
    this person is proceeded to create a Follower. Otherwise it will
    I send to the addRemoveFollower function, to analyze whether to activate or deactivate the follow*/
    const stateFollower = () => {
        fetch(`${API}/following/user/${user.id}`)
        .then(response => response.json()
        )
        .then(data => {
            if(data.id === undefined) createFollower(user.id);
            else addRemoveFollower(data);
            }
        )
        .catch(error => console.log(error));

    }

    //The follow is created
    const createFollower = (id) =>{
        fetch(`${API}/create/following`,{
            method: 'POST',
            body: JSON.stringify({
                user_following_id: id
            })
        })
        .then(response => response.json())
        .then(data =>{
            stateButtonFollower();
            dataFollows();
            console.log(data);
        })
    }

    //if data.activate is true the follow is deactivated, if it is false the opposite is done
    const addRemoveFollower = (data) =>{
        if(data.activate === true){
            fetch(`${API}/following/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    activate: false
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                stateButtonFollower();
                dataFollows();
                console.log(error)});
        }
        else{
            fetch(`${API}/following/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    activate: true
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                stateButtonFollower();
                dataFollows();
                console.log(error)});
        }
        console.log("llego hasta aqui")
    }

    React.useEffect( () => {
        stateButtonFollower();
    }, [])

    return(
        <>
            <button onClick={stateFollower}>{stateButton.button}</button>     
        </>

    )
}

const CreatePost = (props) => {
    const [datos, setDatos] = React.useState({body: ''});
    const user = props.user;
    const allPost = props.allPost;

    /*We obtain the text of the publication that we will create and save it in a state*/
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
        
    }
    
    /*We create the publication with the status of the text sent*/
    const enviarDatos = (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.body)
        fetch(`api/create/posts`, {
            method: 'POST',
            body: JSON.stringify({
                body: datos.body
            })
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if(result.message === 'Success') {
            return allPost();
          }
        })
        
    }   

    return (
        <div className="post container-fluid cont-btn-create">
                <button type="button" className="text-dark btn btn-outline-light btn-create" data-bs-toggle="modal" 
                data-bs-target="#form-modal">What are you thinking {user.username}?</button>
                <form className="modal fade" id="form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" 
                aria-hidden="true"  onSubmit={enviarDatos}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-title" id="exampleModalLabel">Create Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <textarea name="body" placeholder={`What are you thinking ${user.username}?`} 
                                className="form-control" id="body" rows="3" onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close</button>
                            <button type="submit" className="btn btn-primary" id="submit" data-bs-dismiss="modal">To Post</button>
                        </div>
                        </div>
                    </div>
                </form>
        </div>
    )

}

const EditPost = (props) => {
    const [stateText, setText] = React.useState({body2: ""});
    const allPost = props.allPost;
    const post = props.post;
    const textArea = React.createRef();

    /*we receive the data of a post, and the value body
    We assign it to the value of the form's textarea*/
    const valuePost = () => {
        textArea.current.value = post.body;
    }

    /*We receive the data of the publication to modify and update its body,
    later the posts are updated*/
    const editPost = (event) => {
        event.preventDefault();
        console.log(event.target.dataset.number);
        fetch(`${API}/posts/${event.target.dataset.number}`, {
            method: 'PUT',
                body: JSON.stringify({
                    body: stateText.body2
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.message === 'Success') {
                  return allPost();
                }
              })
            .catch(err => {
                return allPost();});
    }

    /*Pressing the createPost button updates the status of the text,
    with which we will create the future publication*/
    const HandleChangePost = (event) => {
        setText({
            ...stateText,
            [event.target.name]: event.target.value
        })
    }

    React.useEffect(() => {
        valuePost();
    }, [])


    return(
        <form className="modal fade" data-number={post.id} id={`form-modal${post.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" 
                    aria-hidden="true" onSubmit={editPost}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-title" id="exampleModalLabel">Edit Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <textarea name="body2" ref={textArea}
                                className="form-control" id="body2" rows="3" onChange={HandleChangePost}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close</button>
                            <button type="submit" className="btn btn-primary" id="submit2" data-bs-dismiss="modal">To Post</button>
                        </div>
                        </div>
                    </div>
                </form>

    )
}

const AllUsers = (props) => {
    const [user, setUser] = React.useState([]);
    const mi_user = props.user;
    const user_id = props.post.user_id;
    const post = props.post;
    const allPost = props.allPost;

    /*Finally we obtain the data of the User who wrote the post*/
    const pasar = () =>{
        console.log("Llego a AllUser");
        const getUser = user;
        props.getUser(getUser);
    }

    /*if you click on the name of the post creator, all your posts will be sent
    data to the parent component App*/
    const HandleNewChange = () => {
        props.HandleChange(false)
        pasar();
    }


    //We obtain from the api the data of the creator of the post
    const User = () => {
        fetch(`${API}/user/${user_id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
            .catch(error => console.log(error));
    };

    React.useEffect(() => {
        User();
    }, []);
    return (
        <>  
            <div className="col">
                <button onClick={HandleNewChange} 
                        className={"username btn btn-link text-decoration-none"}>{user.username}
                </button>
            </div>
            {mi_user.id == user_id &&
                <div className="dropdown col-2">
                    <button className="btn dropdown-toggle btn-dpd" type="button" id="dropdownMenu2" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button" data-bs-toggle="modal" 
                        data-bs-target={`#form-modal${post.id}`}>Edit</button></li>
                    </ul>
                <EditPost allPost={allPost} post={post} />
            </div>
            }
        </>
    );


}

const ButtonLike = (props) => {
    const [like, setLike] = React.useState([]);
    const [stateButton, setButtonLike] = React.useState({state: false,
        button: null
        })
    const post = props.post;

    /*We change the state of the button, if the like does not exist or is not activated
    We put the state of the button in false and we assign the value of the name of the button in Like.
    If the button exists and is activated, we do everything contrary to the above*/
    const stateButtonLike = () => {
        fetch(`${API}/like/user/${post.id}`)
        .then(response => response.json()
        )
        .then(data => {
            if(data.id === undefined || data.activate==false) {setButtonLike({
                ...stateButton,
                state:false,
                button: 'Like'
            });}
            else {setButtonLike({
                ...stateButton,
                state:true,
                button: 'Dislike'
            });
            }
        }
        )
    }
    
    /*Once the like button is clicked, we proceed to make the checks.
    If the button does not exist we can create it, otherwise we send it to the addRemoveLike function.
    Which will check if it activates or deactivates the like*/
    const stateLike = (id) => {
        fetch(`${API}/like/user/${id}`)
        .then(response => response.json()
        )
        .then(data => {
            if(data.id === undefined) createLike(id);
            else addRemoveLike(data);}
        )
        
    }

    //The like is created and the status of the button is updated
    const createLike = (id) => {
        fetch(`${API}/create/like`,{
            method: 'POST',
            body: JSON.stringify({
                posts_id: id
            })
        })
        .then(response => response.json())
        .then(data =>{
            PostLike();
            stateButtonLike(); 
            console.log(data)
        })
    }
    
    /*If data.activated is true, we call the api and change the state to false.
    if it is in false we change to true*/
    const addRemoveLike = (data) =>{
        if(data.activate === true){
            fetch(`${API}/like/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    activate: false
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => {
                stateButtonLike();
                PostLike();
                console.log(error)})
        }
        else{
            fetch(`${API}/like/${data.id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    activate: true
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => {
                stateButtonLike();
                PostLike();
                console.log(error)})
        }
    }

    /*We get all the likes of the post and then show the total*/
    const PostLike = () => {
        fetch(`${API}/like/posts/${post.id}`)
            .then(response => response.json())
            .then(data => {
                setLike(data);
            })
            .catch(error => console.log(error))

    }

    React.useEffect(() => {
        PostLike();
        stateButtonLike();
    }, [])


        return(
            <>
                <p><i className="bi bi-hand-thumbs-up"></i>{like.length}</p>
                <hr />
                <button type="button" onClick={() => stateLike(post.id)}
                 className={"btn-like btn btn-outline-primary"}>
                <i className="bi bi-hand-thumbs-up like">{stateButton.button}</i></button>
            </>

        )
}

const Pagination = (props) => {
    const pageNumbers = [];
    const totalPosts = props.totalPosts;
    const postPerPage = props.postPerPage;
    const paginate = props.paginate;

    //We obtain the number of pages that will be shown in the pagination
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} className="page-link">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
    )

}

const IndividualPost = (props) => {
    /*We receive all posts currently loaded from the parent component "AllPosts", to
    later go through them and show all your data*/ 
    const posts = props.posts;
    /*------*/
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postPerPage] = React.useState(10);

    //We obtain the necessary publications to show per page and thus activate pagination
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Change page
    //we hope to receive the page number of the child component pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


return(
    <>
    {currentPosts.map((mi_post) => (
        <div className={"post container-fluid"}>
            <div className="row">
                    <AllUsers key={mi_post.id} post={mi_post} user={props.user}
                     allPost={props.allPost} HandleChange={props.HandleChange} 
                     getUser={props.getUser} />
                    <p className={"fecha-post"}><span>{mi_post.date}</span></p>
                </div>
                <div>
                    <p>{mi_post.body}</p>
                </div>
                <div className={"cont-btn"}>
                    <ButtonLike post={mi_post} />
            </div>
        </div>
    ))}
    <Pagination postPerPage={postPerPage}
    totalPosts={posts.length} paginate={paginate} />
    </>

)

}

const AllPosts = (props) => {
    const mi_user = props.user;
    const [posts, setPost] = React.useState([]);

    //We get all currently activated posts
    const allPost = () => {
        fetch(`${API}/posts/all`)
        .then(response => response.json())
        .then(data => {
            setPost(data)
        })
        .catch(error => console.log(error))
    }

    /*We save in another function the data sent from the parent component App,
    to give them to the IndividualPost component and we hope to receive the desired data by
    the parent component*/
    const pasar = (user) =>{
        console.log("Se paso");
        const getUser = user;
        props.getUser(getUser);
    }

    React.useEffect(() => {
        allPost();
    }, [])

    return(
        <div>
            <CreatePost user={mi_user} allPost={allPost}/>
            <IndividualPost posts={posts} user={mi_user} allPost={allPost}
                HandleChange={props.HandleChange} getUser={pasar} />
        </div>
    )
}

function App() {
    const [miUser, setUser] = React.useState([]);
    const [state, setState] = React.useState({checked: true});
    const [valor, setValor] = React.useState({value: null})

    //We obtain the data of the currently logged user
    const dataUser = () => {
        fetch(`${API}/user`)
        .then(response => response.json())
        .then(data => {
            setUser(data)
        })
        .catch(error => console.log(error))
    }

    /*decide which component view you want to see, 
    if it receives true it will see all the posts, 
    if it receives false the profile view will be activated.By default it is true
    if it receives following, the following view will be activated. */
    const HandleChange = (parameter) =>{
        setState({
            ...state,
            checked: parameter})
            console.log(state)
    }

    document.getElementById("btn-following").onclick = () => HandleChange(false);
    document.getElementById("btn-following").onclick = () => HandleChange("following");

    /*The function was sent to a child component and it is expected to receive
    the respective data of the user in which the name is pressed,
    to assign it to the state called "value", and later pass it to the "Profile" component
    to render the profile of that user
    */
    const getUser = (user) => {
        setValor({
            ...valor,
            value: user
        })
    }

    const showComponent = () => {
        if(state.checked == true){
          return <AllPosts getUser={getUser} user={miUser} HandleChange={HandleChange}/>
        }
        else if(state.checked == "following"){
            return <Following getUser={getUser} user={miUser} HandleChange={HandleChange} />
        }
        else{
            return <Perfil user={miUser} valor={valor.value} />
        }
    }

    React.useEffect(() =>{
        dataUser();
    }, [])
    return (
        

    <div>
        {showComponent()}
    </div>

    );
}

ReactDOM.render(<App />, document.querySelector("#root"));