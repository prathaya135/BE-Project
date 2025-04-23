const crypto=require('crypto');


const generateConfirmationToken=(userId)=>{
    return crypto.createHash('sha256').update(userId+Date.now().toString()).digest('hex');
}

module.exports=generateConfirmationToken;