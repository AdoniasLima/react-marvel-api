import MD5 from "crypto-js/md5";

const publicKey = "your key";
const privateKey = "your key";

function time() {
    var timestamp = Math.floor(new Date().getTime() / 1000)
    return timestamp;
}

//Generate link with timestamp and keys
function generateLink(){
    let link = "ts="+ time() + "&apikey=" + publicKey + "&hash=" + MD5(time() + privateKey + publicKey);
    return link.toString();
}

export default generateLink;