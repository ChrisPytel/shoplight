// Client facing scripts related to messages.ejs run here

// const fn = require('../../resources/functions');  // DOM ERROR returns messages.js:3 Uncaught ReferenceError: require is not defined

$(document).ready(function() {
  console.log("Successfully loaded jQuery on messages.js script attached to messages.ejs");
    

  //Event listener to kickoff chain of fetchingMail from DB
  $('.open-inbox').on('click', function(){
    console.log(`Opening our Inbox!`);
    $('.open-inbox').remove();
    $('.refresh-icon').css('visibility', 'visible');
    $('.message-container').css('opacity', '1');
    $('.inbox').css('opacity', '1');
    beginMailLoading();
    playSfx(`https://files.catbox.moe/q60wtp.mp3`, `#secret-audio`, 2000);                         // Plays msn messenger sound
  });
  

  //Event listener to kickoff chain of fetchingMail from DB
  $('.refresh-icon').on('click', function(){
    console.log(`Refreshed Inbox.`);
    playSfx(`https://files.catbox.moe/q60wtp.mp3`, `#secret-audio`, 2000);                         // Plays msn messenger sound
    beginMailLoading();
  });
  
  const beginMailLoading = function() {
    $('.drawing-space').empty();
    $('.outgoing').empty();
    msgTypewriter("Select an inbox item on the left to begin.", '.drawing-space'); //typewriter
    fetchMailFromDB(); //uncomment do have DOM initialize the fetchMailFromDB sequence on its own when page loads
  };
  
  const fetchMailFromDB = () => {
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
  
  
  //1st in the chain of populating inbox
  const renderInboxItems = function(mailObjects) {      
    // console.log(`Our mailObjects: `, mailObjects);
    $('.inbox').empty();                                              //Purges any old Inbox Entries from page  
    let initialDelay = 0, writeSpeed = 150;                           // for setTimeout()  [delay before writing begins | and speed in milliseconds between iterations]

    for (let i = 0; i < mailObjects.length; i++) {                       // C style loop is used here to generate ID based on loop iteration #     
      const id = i+1;                                                    // (id 1+1 to not begin at 0 index)
      
      setTimeout(() => {  // ---------------------------- Start of setTimeout ------------------------------
        const entry = createInboxEntry(mailObjects[i], id);                             // Passes the individual message to markup function and the ID from the Cstyle index
        $('.inbox').append(entry);                                                      // Takes return value and renders it in the inbox container    
        
        $(`.inbox-id-${id}`).on('click', function(){                                    // Creates an event listener on the DOM to target THIS particular inbox item         
          console.log(`Selected Inbox item #${id}!`);
          toggleReadStatusVisibility(id, mailObjects[i]);                               // Toggles visibility of the Unread Messages with jquery/css
          markAsOpened(id, mailObjects[i]);                                             // Actually marks them in the Database as opened
          $('.outgoing').empty();
          const message = renderMessage(mailObjects[i], id);                             // Creates our message markup and appends it to the drawing-space  
          $('.drawing-space').empty().append(message);                                   // Wipes any old messages from page, appends new one 

          $('.reply-icon').on('click', function(){                                       // Creates an event listener on the Reply Button to toggle form visibility
            const replyForm = createReplyForm(mailObjects[i], id);                  
            console.log(`Our replyForm is: `, replyForm);
            $('.outgoing').empty().append(replyForm);                                    // Clears container and adds a new reply-form for this message 

            $('.send-button').on('click', function(){                                    // Adds an event listener to the send-button for playing sfx
            $('.reply-form .textarea').val('');                                          // Clears the form  
              playSfx(`https://files.catbox.moe/plt573.wav`, `#secret-audio`, 4000);     // Plays woosh sound
            }); 
          });
        });                
      }, initialDelay);
      initialDelay = initialDelay + writeSpeed; // ---------- End of setTimeout ------------------------------
    }    
  };

  //2nd in the chain of populating inbox
  const createInboxEntry = function(message, id) {
    console.log(`Inbox item #${id} contains: `, message); 
    const readableDate = sqlDateConversion(message.date_sent)

    if (message.read_status === true){     //Creates an HTML markup depending on the read_status of the inbox item
      return $(`
      <article class ="inbox-entry inbox-id-${id}">
        <div class="inbox-left">
          <h4 class="inbox-from">Message from ${xssSanitize(message.from)}</h4>
          <p class="re-listing">Re: ${xssSanitize(message.listing)}</p>
        </div>
        <div class="inbox-right">
          <p class="sent-on"><b>Sent on:</b> ${readableDate}</p>
          <p class="read-status opened read-status-opened-${id} is-visible"> <i class="fa-regular fa-envelope-open"></i> Opened</p>
        </div>
      </article>
      `); 
    }

    else if(message.read_status === false){
    return $(`
    <article class ="inbox-entry inbox-id-${id}">
      <div class="inbox-left">
        <h4 class="inbox-from">Message from ${xssSanitize(message.from)}</h4>
        <p class="re-listing">Re: ${xssSanitize(message.listing)}</p>
      </div>
      <div class="inbox-right">
        <p class="sent-on"><b>Sent on:</b> ${readableDate}</p>
        <p class="read-status unread read-status-unread-${id} "> <i class="fa-solid fa-envelope look-at-me"></i> <b> Unread Message </b></p>
        <p class="read-status opened read-status-opened-${id} "> <i class="fa-regular fa-envelope-open"></i> Opened</p>
      </div>
    </article>
    `);  
    }   
  };

  //3rd in the chain, after clicking inbox item
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
      <p class="render-sender">${xssSanitize(message.from)}: </p>
      <p class="render-message">${xssSanitize(message.message)}</p>
      </div>
      <div class= "reply-icon">
        <i class="fa-solid fa-reply"></i>
        <p>Reply</p>
      </div>
    `);
    }
  };

  //4th in the chain, after clicking reply button
  const createReplyForm = function(message, id) {
    console.log(`Created markup for form corresponding to inbox item # ${id}`); 
    console.log(`Our reply target is: `, message.from);

    return $(`
    <section class = "outgoing">
      <div class = "reply-form-container form-${id}">
        <form class="reply-form" method="POST" action="/messages">
          <p class="replying-to">Replying to <b>${xssSanitize(message.from)}</b> </p>
          <textarea placeholder="My Reply..." name="text" type="text" class="textarea"></textarea>
          <input type="hidden" id="reply_from" name="user_id_from" value="${message.user_id_to}">
          <input type="hidden" id="reply_to" name="user_id_to" value="${message.user_id_from}">
          <input type="hidden" id="listing" name="product_id" value="${message.product_id}">
          <button type="submit" class="send-button">Send</button>
        </form>
      </div>
    </section>
    `);
  };
 


  // ---------------------------- Modular Functions ----------------------------


  const playSfx = function(audioSrc, elementClass, timeoutDuration) {   
    const audioElement = `   
    <audio controls id='musicplayer' autoplay>
    <source src="${audioSrc}" />
    </audio>`

    $(elementClass).append(audioElement).addClass(`not-visible`); 

    setTimeout(() => {
      $(`#musicplayer`).remove();      
    }, timeoutDuration);
  };

  //If a inbox item is unread, this updates the UI
  const toggleReadStatusVisibility = function(inboxID) {
    console.log(`Toggle unread->opened on inboxID: `, inboxID);
    $(`.read-status-unread-${inboxID}`).remove();      
    $(`.read-status-opened-${inboxID}`).addClass('is-visible'); 
  };

  //If a inbox item is unread, this POSTS to the DB that its been opened
  const markAsOpened = function(inboxID, messageID) {    
    console.log(`Marking as opened! Our inboxID:`, inboxID, `and messageID:`, messageID);
    
    //Reminder - Connect this func to the route that POSTS to database to update the read_status
  };


  const msgTypewriter = function(message, targetElement) {
    let initialDelay = 1500; //delay before writing begins
    let writeSpeed = 50;

    let typeWriterString = ' ';

    for (let i = 0; i < message.length; i++) {
      setTimeout(() => {
        $(`${targetElement}`).empty();
        typeWriterString = typeWriterString + message[i];
        $(`${targetElement}`).append(`<p class="faded">${typeWriterString}</p>`);
          console.log(`Typing:`, typeWriterString);
      }, initialDelay);
      initialDelay = initialDelay + writeSpeed;
    }
  };

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



  // --------------- initialization ---------------

  // beginMailLoading(); //uncomment do have DOM initialize the fetchMailFromDB sequence on its own when page loads


}); // --------- end of $(document).ready ---------




  /* Pseudocode with Jake for tackling message rendering and form population 
  
  target the drawing space
  paste the message into the drawing space, restructure into function to create markup for the message renderer
  clear the message after the event listener has been pressed again
  
  render our reply button with dynamic ID
  render our form, pass in ID to post to our DB
  If the reply button is pressed, use css to reveal the hidden form
  */