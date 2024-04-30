// Client facing scripts related to messages.ejs run here

// const fn = require('../../resources/functions');  // DOM ERROR returns messages.js:3 Uncaught ReferenceError: require is not defined

$(document).ready(function() {
  console.log("Successfully loaded jQuery on messages.js script attached to messages.ejs");
    
  //Event listener to kickoff chain of fetchingMail from DB
  $('.refresh-icon').on('click', function(){
    console.log(`Refreshed Inbox!`);
    $('.drawing-space').empty();
    $('.outgoing').empty();
    fetchMail();   
  });
  
  // fetchMail(); //uncomment do have DOM initialize the fetchMail sequence on its own

  const fetchMail = () => {
    $.ajax({
      url: `/api/messages`,
      method: 'GET',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
      success: function(dataOnSuccess){
        console.log(`$.ajax GET request came through. Data is: `, dataOnSuccess);       
        renderInboxItems(dataOnSuccess.messages);       //Initializes chain of rendering the inbox items
      },  
      error: function(error){
        console.error(`$.ajax ${this.method} request error on route: '${this.url}'\nDetails:`, error);
      }  
    });   
  };  
  
  
  
  //1st in the chain
  const renderInboxItems = function(mailObjects) {      
    console.log(`Our mailObjects: `, mailObjects);
    $('.inbox').empty();                            //Purges any old Inbox Entries from page  

    let initialDelay = 0, writeSpeed = 150;  // delay before writing begins, and speed in milliseconds between iterations

    for (let i = 0; i < mailObjects.length; i++) {                       // Refactored forEach into a C style to generate ID based on loop iteration
      const id = i+1; 
      
      setTimeout(() => {  // ---------------------------- Start of setTimeout ------------------------------
        const entry = createInboxEntry(mailObjects[i], id);              // Passes the individual message to markup function and the ID from the Cstyle index
        $('.inbox').append(entry);                                       // Takes return value and renders it in the inbox container    
        
        // Creates an event listener on the DOM to target THIS particular inbox item
        $(`.inbox-id-${id}`).on('click', function(){                     
          console.log(`Selected Inbox item #${id}!`);
          $('.outgoing').empty();
          const message = renderMessage(mailObjects[i], id);                             // Creates our message markup and appends it to the drawing-space  
          $('.drawing-space').empty().append(message);                                   // Wipes any old messages from page, appends new one 

          // Creates an event listener on the Reply Button to toggle form visibility
          $('.reply-icon').on('click', function(){                
            console.log('cool');

            const replyForm = createReplyForm(mailObjects[i], id);
            console.log(`Our replyForm is: `, replyForm);
            $('.outgoing').empty().append(replyForm);
          });
        });
                
      }, initialDelay);
      initialDelay = initialDelay + writeSpeed; // ---------- End of setTimeout ------------------------------
    }    
  };

   //Creates the HTML markup to be appended later to the HTML
    const createInboxEntry = function(message, id) {
    console.log(`Inbox item #${id} contains: `, message); 
    const readableDate = sqlDateConversion(message.date_sent)
    let readStatus = "Unread";
      if (message.read_status === true){
        readStatus === "Read";
      } 
    return $(`
    <article class ="inbox-entry inbox-id-${id}">
      <div>
        <h4>Message from ${xssSanitize(message.from)}</h4>
        <p>Re: ${xssSanitize(message.listing)}</p>
      </div>
      <div>
        <h4>Sent on: ${readableDate}</h4>
        <p class = "read-status-${id}">${readStatus}</p>
      </div>
    </article>
    `);    
  };

  const renderMessage = function(message, id) {
      console.log(`Our renderMessage is:\n`, message.message, `\nFor inbox-item #${id}`); 
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
        <div class= "reply-icon">
          <i class="fa-solid fa-reply"></i>
          <p>Reply</p>
        </div>
      `);
      }
    };

    const createReplyForm = function(message, id) {
      // Function code goes here
      console.log(`Created markup for form corresponding to inbox item # ${id}`); 
      console.log(`Our reply target is: `, message.from);

      return $(`
      <section class = "outgoing">
        <div class = "reply-form-container form-${id}">
          <form class="reply-form" method="POST" action="/messages">
            <p>Replying to <b>${xssSanitize(message.from)}</b> </p>
            <textarea placeholder="My Reply..." name="text" type="text" class="textarea"></textarea>
            <input type="hidden" id="metadata1" name="user_id_from" value="${message.user_id_from}">
            <input type="hidden" id="metadata2" name="user_id_to" value="${message.user_id_to}">
            <button type="submit" class="send-button">Send</button>
          </form>
        </div>
      </section>
      `);
    };
 

  /* Pseudocode for taclking message rendering and form population */
  
  // target the drawing space
  // paste the message into the drawing space, restructure into function to create markup for the message renderer
  // clear the message after the event listener has been pressed again
  //
  // render our reply button with dynamic ID
  // render our form, pass in ID to post to our DB
  // If the reply button is pressed, use css to reveal the hidden form




  // ---------------------------- Modular Functions ----------------------------
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



}); // --------- end of $(document).ready ---------