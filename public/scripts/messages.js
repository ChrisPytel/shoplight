// Client facing scripts related to messages.ejs run here

// const fn = require('../../resources/functions');  // DOM ERROR returns messages.js:3 Uncaught ReferenceError: require is not defined

$(document).ready(function() {
  console.log("Successfully loaded jQuery on messages.js script attached to messages.ejs");
    
  $('.refresh').on('click', function(){
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

  const renderInboxItems = function(mailObjects) {
    console.log(`Our mailObjects: `, mailObjects);
    for (let i = 0; i < mailObjects.length; i++) {                //refactored forEach into a C style to generate ID based on loop iteration
      const id = i+1;
      const entry = markupInboxEntry(mailObjects[i], id);         //passes the individual message to markup function and the ID from the Cstyle index
        $('.inbox').append(entry);                             // takes return value and renders it in the inbox container

        $(`.inbox-id-${id}`).on('click', function(){       //creates an event listener on the DOM to target THIS particular inbox item
          console.log(`Selected Inbox item #${id}!`);
          $('.drawing-space').empty();                            //Wipes any old messages from page 
          const message = renderMessage(mailObjects[i], id);
          $('.drawing-space').append(message);                             // takes return value and renders it in the inbox container
        });
    }
    
  };





  /* Pseudocode for taclking message rendering and form population */
  
  // target the drawing space
  // paste the message into the drawing space, restructure into function to create markup for the message renderer
  // clear the message after the event listener has been pressed again
  //
  // render our reply button
  // render our form, pass in ID to post to our DB
  // If the reply button is pressed, use css to reveal the hidden form


  
  //Creates the HTML markup to be appended later to the HTML
    const markupInboxEntry = function(message, id) {
    //  console.log(`Our inbox item contains: `, message); 
    console.log(`Our message.message is: `, message.message);  
    const readableDate = sqlDateConversion(message.date_sent)
    let readStatus = "Unread";
      if (message.read_status === true){
        readStatus === "Read";
      } 
    return $(`
    <article class ="inbox-entry inbox-id-${id}">
      <div>
        <h4>Message from: ${xssSanitize(message.from)}</h4>
        <p>Re:${xssSanitize(message.listing)}</p>
      </div>
      <div>
        <h4>Sent on: ${readableDate}</h4>
        <p class = "read-status-${id}">${readStatus}</p>
      </div>
    </article>
    `);    
  };


  const renderMessage = function(message, id) {
      console.log(`Our message drawer is: `, message.message, `\nFor item# ${id}`); 

      if (!message.message) { //In the event message is undefined
        return $(`
          <div>
            <p>Internal Server Error 500, Error in getting message from inbox</p>
          </div>
        `);
      }else {
        return $(`
        <div>
          <p>${xssSanitize(message.message)}</p>
        </div>
        <div>
          <i class="fa-solid fa-reply"></i>
        </div>  
      `);        
      }
    };


    const drawReplyFormForID = function(originalPoster) {
      // Function code goes here

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