// ----------------- Helper Functions -----------------

const checkLoginCredentials = (formEmail, formPassword, dbReturn) => {  
  console.log(`04- checkLoginCredentials email is: ${formEmail}, Password is: ${formPassword}, and database returned:\n`, dbReturn);
  if (dbReturn[0] === undefined){                        
    console.log(`06- Empty array from DB, Credentials are not a match`);   //Works but is very WET, clean up later
    return {verified: false};
  }
  
  const dbID = dbReturn[0].id;
  const dbEmail = dbReturn[0].email;
  const dbPass = dbReturn[0].password; 
  console.log(`05- Our dbID is,`, dbID,`Our dbEmail is,`, dbEmail,`Our dbPass is,`, dbPass,);

  if (formEmail === dbEmail && formPassword === dbPass) {
    console.log(`06- Your Email and password matches our database!!!`);
    return {verified: true, id: dbID};  
  } else {
    console.log(`06- Credentials are not a match`);
    return {verified: false};  
  }
};

module.exports = {
  checkLoginCredentials
};
