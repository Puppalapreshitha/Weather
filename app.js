const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	res.sendFile(__dirname +"/weather.html");
});
app.post("/",function(req,res){
	//console.log(req.body.cityName);
    //console.log("post received");
    const query=req.body.cityName;
	const apikey="e72ca729af228beabd5d20e3b7749713";
	const units="metric";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
	https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data",function(data){
			const weatherData=JSON.parse(data);
			const temp=weatherData.main.temp;
			const weatherDescription=weatherData.weather[0].description;
			const icon=weatherData.weather[0].icon;
			const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
		
		    const coord=weatherData.coord.lat;
		    res.write("<p>the weather is currently"+weatherDescription+"</p>");
		    res.write("<h1>the temperature in"+query+" is"+temp+"degree celcius</h1>");
			res.write("<img src="+imageURL+ ">");
			res.send()
		});
	});
});

	//res.send("server is up and running");
app.listen(3000,function(){
	console.log("server is running on part 3000");
});