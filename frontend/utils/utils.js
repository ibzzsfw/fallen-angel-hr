const timeFormat = time => new Date(time).toLocaleTimeString('en-GB', { hour12: false });
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export {
    timeFormat,
    monthNames,
    dayNames,
}