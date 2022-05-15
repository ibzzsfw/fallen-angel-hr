const timeFormat = time => new Date(time).toLocaleTimeString('en-GB', { hour12: false });
const dateFormat = date => new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export {
    timeFormat,
    dateFormat,
    monthNames,
    dayNames,
}