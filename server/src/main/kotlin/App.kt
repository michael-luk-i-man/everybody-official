
external fun require(module: String): dynamic

@JsModule("pusher")
external class Pusher(config: Any) {
    fun trigger(channel: String, event: String, data: Any)
}


val express = require("express")

val pusherConfig  = object {
    val appId = "497481"
    val key = "e686a9066178e8304923"
    val secret = "bb5453e06c069a608b44"
    val cluster = "us2"
    val encrypted = true
}

val clickChannel = "click-channel"
val clickEvent = "click-event"
var currentClickCount = 0


fun main(args: Array<String>) {
    val app = express()
    val pusher = Pusher(pusherConfig)

    var londonTempData = {
    city: 'London',
    unit: 'celsius',
    dataPoints: [
      {
        time: 1130,
        temperature: 12 
      },
    ]
  }

app.get('/getListLocs', function(req,res){
  res.send(londonTempData);
});
    
    app.get("/counts", { _, res ->
        res.json(ClickCount(currentClickCount))
    })



    app.post("/clicks", { _, res ->
        currentClickCount++
        // broadcast new ClickCount
        pusher.trigger(clickChannel, clickEvent, ClickCount(currentClickCount))
        res.status(200).send()
    })

    app.get('/clockIn', function(req,res){
  var lat = parseInt(req.query.a);
  var lon = parseInt(req.query.o);
  rando = Math.floor(Math.random() * 0.05) - 0.05  
  if(a && o && !isNaN(a) && !isNaN(o)){
    var newDataPoint = {
      latitude: lat+rando,
      longitude: lon+rando
    };
    londonTempData.dataPoints.push(newDataPoint);
    pusher.trigger('london-temp-chart', 'new-temperature', {
      dataPoint: newDataPoint
    });
    res.send({success:true});
  }else{
    res.send({success:false, errorMessage: 'Invalid Query Paramaters, required - temperature & time.'});
  }
});
    
    app.listen(9999, {
        println("Listening on port 9999")
    })
}