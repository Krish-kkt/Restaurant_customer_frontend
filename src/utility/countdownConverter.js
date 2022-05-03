const countdownConverter=(value)=>{
    let hour=Math.floor((value/60));
    hour='0'+hour;

    let sec=value%60;
    if(sec<=9) sec='0'+sec;
    else sec=sec.toString();

    return (hour+':'+sec);
}

export default countdownConverter;