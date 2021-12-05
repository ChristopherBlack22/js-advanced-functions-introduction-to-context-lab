function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray))
}

function createTimeInEvent(employeeRecord, timeIn) {
    const [date, hour] = timeIn.split(" ");
    const record = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeInEvents.push(record);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOut) {
    const [date, hour] = timeOut.split(" ");
    const record = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeOutEvents.push(record);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const start = employeeRecord.timeInEvents.find(e => e.date === date);
    const end = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (end.hour - start.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date)*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const workedDates = employeeRecord.timeInEvents.map(function(event) {
        return event.date
    });
    return workedDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employeeRecord, date)
    }, 0);
}

function findEmployeeByFirstName(srcArray, name) {
    return srcArray.find(function(employee) {
        return employee.firstName === name
    })
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0);
}