exports.checkCapability = async(capability) =>{
    capName = capability.capabilityName
    console.log(capName)
    error = false

    if (capName.length > 20 || capName.length == 0) {
        console.log("forename")
        error = true
    } else{
        error = false;

    }   

    return error;



}