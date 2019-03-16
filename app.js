window.addEventListener('load',() => {
    let long;
    let lat;

    const temperatureDegree = document.querySelector(".temp-degree");
    const temperatureDescription = document.querySelector(".temp-description");
    const locationTimezone = document.querySelector(".location h1");
    const CurrentTime = document.querySelector(".location h2");
    const TempSection = document.querySelector(".degree-section");
    const TempSpan = document.querySelector(".degree-section span");
    const TempsSummary = document.querySelector(".temp-Summary");
        if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition(postion =>{

                long = postion.coords.longitude;
                lat = postion.coords.latitude;

                const proxy = "https://cors-anywhere.herokuapp.com/";

                const api = `${proxy}https://api.darksky.net/forecast/fd08091268790eccea65e381159ebf20/${lat},${long}`;

                fetch(api)
                .then(Response =>{
                    return Response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, summary,icon} =  data.currently;
                    // set DOM elements from APi;

                    temperatureDegree.textContent= temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent= data.timezone;
                    TempsSummary.textContent = data.hourly.summary;
                   
                   
                    //Formula for our temperature given in F to C
                    const celcuis = (temperature-32)*(5/9);
                    // Icon
                    setIcons(icon,document.querySelector(".icon"));
                    // change temp form F to C
                    TempSection.addEventListener('click',()=>{

                        if (TempSpan.textContent==="F"){
                            TempSpan.textContent = "C";
                            temperatureDegree.textContent=celcuis.toFixed(1);

                        } else{
                            TempSpan.textContent = "F";
                            temperatureDegree.textContent = temperature.toFixed(1);
                        }
                    })

                });
            });
        } 
             else{
                h1.textcontent= "Failed to load could not get user location";
            }
           
            function setIcons(icon,iconID){
                const skycons = new Skycons({color:"white"});
                const currentIcon = icon.replace(/-/g,"_").toUpperCase();

                skycons.play();
                return skycons.set(iconID,Skycons[currentIcon]);
            }
                    
            function showTime(){
                var date = new Date();
                var h = date.getHours(); // 0 - 23
                var m = date.getMinutes(); // 0 - 59 
                var s = date.getSeconds();//0- 59
                var session = "AM";
                
                if(h == 0){
                    h = 12;
                }
                
                if(h > 12){
                    h = h - 12;
                    session = "PM";
                }
                
                h = (h < 10) ? "0" + h : h;
                m = (m < 10) ? "0" + m : m;
                s = (s < 10) ? "0" + s : s;
                
                var time = h + ":" + m + ":" + s + " " + session;
                 CurrentTime.textContent = time;
                
                setTimeout(showTime, 1000);    
            };
            
            showTime();

            
});