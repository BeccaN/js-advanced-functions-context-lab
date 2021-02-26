/* Your Code Here */
let createEmployeeRecord  = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function (dateStamp) {
    // employee.createTimeEvent("YYYY-MM-DD HHMM") => employee.timeInEvents.include("YYYY-MM-DD HHMM")
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let createTimeOutEvent = function (dateStamp) {
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

let hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.find(event => event.date == date).hour
    let timeOut = this.timeOutEvents.find(event => event.date == date).hour

    return (timeOut/100) - (timeIn/100)
}

let wagesEarnedOnDate = function (date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return wage
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function (employees) {
    return employees.reduce(function(acc, cur){
        return acc + allWagesFor.call(cur)
    }, 0)
}

let findEmployeeByFirstName = function (collection, firstNameString) {
    return collection.find(function(e){
        return e.firstName === firstNameString
    })
}