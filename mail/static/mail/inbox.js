  document.addEventListener('DOMContentLoaded', function() {
  
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email('', ''));

  // By default, load the inbox
  load_mailbox('inbox');

});

function compose_email(email, user) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  //if the email is not empty it will load the data in the input of the form
  if(email !== ''){
  document.querySelector('#compose-recipients').value = user;
  document.querySelector('#compose-subject').value = email.subject;
  document.querySelector('#compose-body').value = `
  ${email.timestamp}, ${user}: 
  ${email.body}`;
  document.querySelector('#compose-body').style.fontWeight = 'bold';
  }
  //if it is empty it leaves the inputs empty
  else{
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }
}


function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  //We call the following function and give it the name of the button that was touched
  calledEmails(mailbox);
}


//CALLED TO API
const calledEmails = (mailbox) => {
  //According to the mailbox value, it will search the api for the types of email that are requested
  fetch(`/emails/${mailbox.toString()}`)
  .then(response => response.json())
  .then(emails => {
      //We call the showEmails function to show the emails that were found
        showEmails(emails, mailbox);
    })
    .catch(err => console.log(err))
};


const showEmails = (emails, mailbox) =>{
  emails.forEach(element => {
    let data = element;
    let cont = document.createElement('button');
    let cont_div = document.createElement('div');

    /*Previously we created a button which when touched will call the call () function that you will get
    the data of the selected email */
    cont.id = `cont-email${element.id}`;
    cont.onclick = () => llamar(element.id, mailbox);
    cont.classList = 'cont-email btn btn-link';
    if(element.read === false)cont.style.backgroundColor = "transparent";

    cont_div.classList = 'div-email row';
    cont_div.id = `${element.id}`;

    /*If the mailbox variable is different from 'sent' in the overview the name will be displayed 
    from which I send the email*/
    if(mailbox !== 'sent'){
    cont_div.innerHTML =`<p class="col">to: ${data.sender.split('@')[0]}</p>
    <p class="col">${data.subject.slice(0, 40)}</p><span>...</span><p class="col">${data.timestamp}</p>`;}
    //Otherwise it shows the one who receives it
    else {
      cont_div.innerHTML =`<p class="col">from: ${data.recipients[0].split('@')[0]}</p>
      <p class="col">${data.subject.slice(0, 40)}</p><span>...</span><p class="col">${data.timestamp}</p>`;}

    cont.append(cont_div);
    document.querySelector('#emails-view').append(cont);
  });
}

const llamar = (id, mailbox) => {
  /*We get the data from the selected email and call the showEmail function to show
  in the html the values of said email, then we call the readEmail function so that
  mark the email as read*/
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    showEmail(email, mailbox);
    readEmail(email.id);
  })
  .catch(err => console.log(err));

}

const showEmail = (email, mailbox) => {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  /*If the email belongs to those sent by the user, it will not be possible to archive, otherwise 
  if possible*/
  if(mailbox === "sent")document.querySelector('#b-archive').style.display = 'none';
  else document.querySelector('#b-archive').style.display = 'block';

  //If the email is not archived, the archiveEmail() function is called to archive it when you press the button
  if(email.archived === false){
    document.querySelector('#b-archive').innerHTML = "Archived";
    document.querySelector('#b-archive').onclick = () => archiveEmail(email);}
  //Otherwise when pressing the button the opposite will happen
    else {
    document.querySelector('#b-archive').innerHTML = "Unarchived";
    document.querySelector('#b-archive').onclick = () => unArchivedEmail(email);}

  //The html view of the email is created showing all its data
  document.querySelector('#sender').innerHTML = `<p>to ${email.sender.split('@')[0]} 
  <span>&lt${email.sender}&gt</span><br> from ${email.recipients[0].split('@')[0]} 
  <span>&lt${email.recipients[0]}&gt</span></p><p>${email.timestamp}</p>`
  document.querySelector('#subject').innerHTML = `<h3>${email.subject}</h3>`
  document.querySelector('#body').innerHTML = `<p>${email.body}</p>`;

  /*we get the email of the person who sent us or to whom we send
  the mail, then send it to the function compose_email(), so that by default 
  aparesca in the input recipients when trying to answer an email */
  if(document.querySelector('#usuario').innerHTML === email.recipients[0].toString()){
  document.querySelector('#answer').onclick = () => compose_email(email, email.sender);
  }
  else{
    document.querySelector('#answer').onclick = () => compose_email(email, email.recipients[0]);
  }
}

const readEmail = (id) => {
  //we get the mail and mark it as read
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  })
}

const archiveEmail = (email) =>{
  //we get the mail and mark it as archived
  document.querySelector('#b-archive').innerHTML = "Unarchived";
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: true
    })
  })
  
}

const unArchivedEmail = (email) =>{
  //we get the mail and mark it as a file
  document.querySelector('#b-archive').innerHTML = "Archived";
  console.log(email.archived)
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: false
    })
  })
  
}



document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('compose-form');
    formulario.addEventListener('submit', (e) => {
      /*We avoid a recharge of the page and then we receive all the data
      of the form, to later load them in the api and thus create a new mail*/
      e.preventDefault();
      const form = new FormData(formulario);
      const recipients = form.get('compose-recipients');
      const subject = form.get('compose-subject');
      const body = form.get('compose-body');
      fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
        })
      })
      .then(response => response.json())
      .then(result => {
          console.log(result);
          return load_mailbox('sent');
      })
      
      return false;
    })
})


