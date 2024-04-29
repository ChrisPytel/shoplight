// Client facing scripts related to messages.ejs run here

// const fn = require('../../resources/functions');  // DOM ERROR returns messages.js:3 Uncaught ReferenceError: require is not defined

$(document).ready(function() {
  console.log("Successfully loaded jQuery on messages.js script attached to messages.ejs");
    
  $('h1').on('click', function(event){
    console.log(`Refreshed Inbox!`);
    fetchMail();   
  });

  $('.inbox-entry').on('click', function(event){    //created before appended elements, does not register
    console.log(`Selected an Inbox item`, event);
    event.preventDefault();

  });

  const renderInboxItems = function(mailObj) {
    console.log(`Our mailObj is: `, mailObj);
    mailObj.forEach((message) => {
      const entry = markupInboxEntry(message);
      $('.inbox').append(entry); // takes return value and appends it to the top of the tweets container
    });
  };
  
  //Creates the HTML markup to be appended later to the HTML
  const markupInboxEntry = function(message) {
   console.log(`Our message is: `, message); 

    return $(`
    <button class ="inbox-entry">      
      <div>
        <h4>Message from: ${message.from}</h4>
        <p>Re:${message.listing}</p>
      </div>
      <div>
        <h4>Sent on: ${message.date_sent}</h4>
        <p>Status: Unread</p>
      </div>  
    </button>
    `);    
  };



const fetchMail = () => {
  $.ajax({
    url: `/api/messages`,
    method: 'GET',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
    success: function(dataOnSuccess){
      console.log(`$.ajax GET request came through. Data is: `, dataOnSuccess);       
      $('.inbox').empty();                            //Purges any old Inbox Entries from page  
      renderInboxItems(dataOnSuccess.messages);       //Initializes chain of rendering the inbox items
    },  
    error: function(error){
      console.error(`$.ajax ${this.method} request error on route: '${this.url}'\nDetails:`, error);
    }  
  });   
};  

fetchMail();


}); // --------- end of $(document).ready ---------