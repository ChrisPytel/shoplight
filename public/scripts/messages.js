// Client facing scripts related to messages.ejs run here

// const fn = require('../../resources/functions');  // DOM ERROR returns messages.js:3 Uncaught ReferenceError: require is not defined

$(document).ready(function() {
  console.log("Successfully loaded jQuery on messages.js script attached to messages.ejs");
    
  $('.refresh').on('click', function(event){
    console.log(`Refreshed Inbox!`);
    fetchMail();   
  });



  //My version of the XSS escape function
  const xssSanitize = function(string) {
    const cleanString = string.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // console.log(`Sanitized string is now:\n `, string);
    return cleanString;
  };

  //Not sure exactly what goes on here, but thank you stack overflow, very cool
  const sqlDateConversion = function(sqlDate) {
    const dateObj = new Date(sqlDate);
    // console.log(`Our dateObj is: `, dateObj);    
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-based, so add 1
    const day = dateObj.getDate().toString().padStart(2, '0');
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');  

    // Convert hours to 12-hour format and determine AM/PM suffix
    let suffix = 'AM';
    if (hours >= 12) {
        suffix = 'PM';
        hours %= 12; 
    }
    if (hours === 0) {
        hours = 12; // Handle midnight (0 hours) as 12 AM
    }  
    return `${year}-${month}-${day} at ${hours}:${minutes} ${suffix}`;    
  };

  const renderInboxItems = function(mailObj) {
    console.log(`Our mailObj is: `, mailObj);
    for (let i = 0; i < mailObj.length; i++) {
      const id = i+1;
      const entry = markupInboxEntry(mailObj[i], id);         //passes the individual message to markup function and the ID from the Cstyle index
      setTimeout(() => {
        $('.inbox').append(entry);                              // takes return value and appends it to the top of the inbox container
        
      }, 500);

      $(`.inbox-id-${id}`).on('click', function(event){             //created before appended elements, does not register
        console.log(`Selected an Inbox item`, event);

      });
    }
    
  };


  /* Pseudocode for taclking message rendering and form population */
  
  // target the drawing space
  // paste the message into the drawing space, create a function to create markup for the message renderer
  // clear the message after the event listener has been pressed again
  //
  // render our reply button
  // render our form, pass in ID to post to our DB
  // If the reply button is pressed, use css to reveal the hidden form


  
  //Creates the HTML markup to be appended later to the HTML
  const markupInboxEntry = function(message, id) {
  //  console.log(`Our inbox item contains: `, message); 
    const readableDate = sqlDateConversion(message.date_sent)
    console.log(`Our message.message is: `, message.message);

    return $(`
    <article class ="inbox-entry inbox-id-${id}">      
      <div>
        <h4>Message from: ${xssSanitize(message.from)}</h4>
        <p>Re:${xssSanitize(message.listing)}</p>
      </div>
      <div>
        <h4>Sent on: ${readableDate}</h4>
        <p>Status: Unread</p>
      </div>  
    </article>
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

// fetchMail();

}); // --------- end of $(document).ready ---------