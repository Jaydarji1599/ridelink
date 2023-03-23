import axios from "axios"

const API_KEY = "4911c1398570bdec7c6e00ee0b3fa83cd4b5cc75y2HEQ3Hug6lCcPNacZlunvciN"

export const ridePostText = (ride) => {
    axios.get(`/api/contacts/${ride.driver}/`)
    .then((res) => {
        const driverPhone = res.data.phone;
        
        let headers = { 'Content-Type': 'application/json'};
        let body = JSON.stringify({
            phone: driverPhone,
            message: `Hooray! Ride successfully booked.\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.\n\nSafe Travels!`,
            key: API_KEY
        })
        axios.post(
          'https://textbelt.com/text', body, {
            headers: headers
        })
    })
    .catch((err) =>{
        console.log(err);
    })
}

export const rideEditedText = (info) => {

    // notify driver
    axios.get(`/api/contacts/${info.driver}/`)
    .then((res) => {
        const driverPhone = res.data.phone;
        let headers = { 'Content-Type': 'application/json'};
        let body = JSON.stringify({
            phone: driverPhone,
            message: `Hi ${info.name}! You modified your ride.\n\nIt is now ${info.source} to ${info.destination} on ${info.date} at ${info.time}.\n\nDrive safe!`,
            key: API_KEY
        })
        axios.post(
          'https://textbelt.com/text', body, {
            headers: headers
        })
    })
    .catch((err) =>{
        console.log(err);
    })

    // notify passengers
    axios.get(`/api/passengers/?ride=${info.id}`)
    .then((res) => {
        const numbers = res.data.map((e) => e.phone);
        for (const number of numbers) {
            let headers = { 'Content-Type': 'application/json'};
            let body = JSON.stringify({
                phone: number,
                message: `Your booked ride has been modified.\n\nIt is now ${info.source} to ${info.destination} on ${info.date} at ${info.time}.`,
                key: API_KEY
            })
            axios.post(
            'https://textbelt.com/text', body, {
                headers: headers
            })
        }
    })
}

export const rideDeletedText = (ride, phoneNumbers) => {

    // notify driver
    axios.get(`/api/contacts/${ride.driver}/`)
    .then((res) => {
        const driverPhone = res.data.phone;
        
        let headers = { 'Content-Type': 'application/json'};
        let body = JSON.stringify({
            phone: driverPhone,
            message: `You deleted your ride from ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.\n\nSee you next time!`,
            key: API_KEY
        })
        axios.post(
          'https://textbelt.com/text', body, {
            headers: headers
        })
    })
    .catch((err) =>{
        console.log(err);
    })

    // notify passengers
    for (const number of phoneNumbers) {
        let headers = { 'Content-Type': 'application/json'};
        let body = JSON.stringify({
            phone: number,
            message: `Your booked ride has been cancelled.\n\nDetails:  ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.`,
            key: API_KEY
        })
        axios.post(
        'https://textbelt.com/text', body, {
            headers: headers
        })
    }
}

export const passengerBookedText = async(passenger, pUser, ride) => {
    // notify driver
    const driverNumber = await (await axios.get(`/api/contacts/${ride.driver}/`)).data.phone
    const passengerNumber = await (await axios.get(`/api/contacts/${passenger.user}/`)).data.phone

    var headersDriver = { 'Content-Type': 'application/json'};
    var bodyDriver = JSON.stringify({
        phone: driverNumber,
        message: `Woohoo! ${pUser.first_name} booked a ride with you!\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.\n\nPassenger Contact: ${passengerNumber}`,
        key: API_KEY
    })
    axios.post(
      'https://textbelt.com/text', bodyDriver, {
        headers: headersDriver
    })


    var headersPassenger = { 'Content-Type': 'application/json'};
    var bodyPassenger = JSON.stringify({
        phone: passengerNumber,
        message: `Your ride booking is confirmed!\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.\n\nDriver Contact: ${driverNumber}`,
        key: API_KEY
    })
    axios.post(
    'https://textbelt.com/text', bodyPassenger, {
        headers: headersPassenger
    })
}

export const passengerRemovedByPassengerText = (driverPhone, passengerPhone, ride, pName) => {
    // notify driver
    var headersDriver = { 'Content-Type': 'application/json'};
    var bodyDriver = JSON.stringify({
        phone: driverPhone,
        message: `${pName} has cancelled their ride with you.\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.`,
        key: API_KEY
    })
    axios.post(
      'https://textbelt.com/text', bodyDriver, {
        headers: headersDriver
    })

    // notify passenger
    var headersPassenger = { 'Content-Type': 'application/json'};
    var bodyPassenger = JSON.stringify({
        phone: passengerPhone,
        message: `Your ride booking has been successfully cancelled.\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.`,
        key: API_KEY
    })
    axios.post(
    'https://textbelt.com/text', bodyPassenger, {
        headers: headersPassenger
    })
}

export const passengerRemovedByDriverText = (driverPhone, passengerPhone, ride, pName) => {
    // notify driver
    var headersDriver = { 'Content-Type': 'application/json'};
    var bodyDriver = JSON.stringify({
        phone: driverPhone,
        message: `${pName} has successfully been removed from your ride.\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.`,
        key: API_KEY
    })
    axios.post(
      'https://textbelt.com/text', bodyDriver, {
        headers: headersDriver
    })

    // notify passenger
    var headersPassenger = { 'Content-Type': 'application/json'};
    var bodyPassenger = JSON.stringify({
        phone: passengerPhone,
        message: `Your ride booking has been cancelled by the driver.\n\nDetails: ${ride.source} to ${ride.destination} on ${ride.date} at ${ride.time}.`,
        key: API_KEY
    })
    axios.post(
    'https://textbelt.com/text', bodyPassenger, {
        headers: headersPassenger
    })
}
