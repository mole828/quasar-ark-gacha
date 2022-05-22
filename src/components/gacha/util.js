export default function formatTime (ts) {
    let date = new Date(ts*1000);
    let year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
    let result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
    return result;
}