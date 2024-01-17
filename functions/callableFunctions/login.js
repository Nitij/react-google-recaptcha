const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios')

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.login = functions
  .https.onCall(async (data, context) => {

    try {

      const {email, password, token} = data

      // let success = false      
      // const SECRET_KEY_v2 = '6LcFlTspAAAAAIFwGs0kwdlhq0-faQU7JdAmFkoh'      
      // const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY_v2}&response=${token}`);
      // if (recaptchaResponse.data.success) {
      //   success = true
      // }

      let success = true
      const SECRET_KEY_v3 = '6LcLlTspAAAAAFkAnPGR4pUxxJUCjQsQUQKlI3aO'
      const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY_v3}&response=${token}`);

      console.log(recaptchaResponse.data)
      if (!recaptchaResponse.data.success || recaptchaResponse.data.score < 0.5 || recaptchaResponse.data.action !== 'login') {
        success = false
      }

      // Authenticate with email and password

      return {
        valid: success
      };
    } catch (error) {
      console.error("Error calling function: ", error);
      throw new functions.https.HttpsError(
        "internal",
        "Internal server error."
      );
    }
  });
