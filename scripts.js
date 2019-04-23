var used_numbers = [];
var first_gen = true;



const gen_number_raw = (low, high) => {
    return Math.floor(
        Math.random() * (high - low) + low
    )
};



const gen_number = () => {

    // Grab the numbers from the page to get the low and high range
    var low_end = parseInt(document.getElementById("low-end").value)
    var high_end = parseInt(document.getElementById("high-end").value) + 1


    // Ensure all input is valid
    if (confirm_input(low_end, high_end)) {
        return
    }


    let random_number = gen_number_raw(low_end, high_end);


    // Ensure the generated number has not been generated before
    while (used_numbers.includes(random_number)) {
        random_number = gen_number_raw(low_end, high_end)
    }


    // Display which # was chosen
    document.getElementById("main-alert").innerHTML = "Chosen Number:  " + random_number


    // Update the history of the generator
    used_numbers.push(random_number)
    if (first_gen) {
        document.getElementById("roll-history").innerHTML += random_number
        first_gen = false
    } else {
        document.getElementById("roll-history").innerHTML += ", " + random_number
    }

};



const confirm_input = (low_end, high_end) => {

    var response = ""
    var errored = false

    // Ensure that we aren't trying to generate more numbers than allowed
    if (used_numbers.length == (high_end - low_end)) {
        console.log(used_numbers)
        response += "ALERT: Cannot generate a new number, all numbers have been used."
        errored = true
    }


    // Ensure that high > low
    if (high_end <= low_end) {
        if (errored) {response += "<br>"}
        response += "ALERT: High end cannot be less than or equal to low end."
        errored = true
    };


    // Ensure low is a positive integer
    if (low_end < 0) {
        if (errored) {response += "<br>"}
        response += "ALERT: Lower end of range cannot be less than 0."
        errored = true
    };


    // Ensure low is not NaN
    if (isNaN(low_end)) {
        if (errored) {response += "<br>"}
        response += "ALERT: Lower end of range must have an input"
        errored = true
    }


    // Ensure high is a positive integer
    if (high_end < 0) {
        if (errored) {response += "<br>"}
        response += "ALERT: Higher end of range cannot be less than 0."
        errored = true
    };


    // Ensure high is not NaN
    if (isNaN(high_end)) {
        if (errored) {response += "<br>"}
        response += "ALERT: Higher end of range must have an input"
        errored = true
    }


    document.getElementById("main-alert").innerHTML = response

    return errored
}



const reset_generator = () => {
    // Resets the page so that you don't always need to reload to reset the generator
    document.getElementById("roll-history").innerHTML = ""
    document.getElementById("main-alert").innerHTML = ""
    first_gen = true
};