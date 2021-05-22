//Fishes update and delete
var fishes = document.getElementById("delete_fishes");
if(fishes != null){
    fishes.addEventListener("click", function(){
        var ids = [];
        var fish = document.getElementsByClassName("fish_data");

        //Get ids to delete
        for(var i = 0; i < fish.length; i++){
            if(fish[i].childNodes[11].checked == true){
                ids.push(fish[i].childNodes[1].placeholder);
            }
        }

        //Delete ids in the list
        for(var i = 0; i < ids.length; i++){
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "/fishes/" + ids[i], true);
            xhttp.send();
        }

        window.location.reload();
    });
}

//Feeds update and delete
var feeds = document.getElementById("delete_feeds");
if(feeds != null){
    feeds.addEventListener("click", function(){
        var ids = [];
        var feed = document.getElementsByClassName("feed_data");

        //Get ids to delete
        for(var i = 0; i < feed.length; i++){
            if(feed[i].childNodes[7].checked == true){
                ids.push(feed[i].childNodes[1].placeholder);
            }
        }

        //Delete ids in the list
        for(var i = 0; i < ids.length; i++){
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "/feeds/" + ids[i], true);
            xhttp.send();
        }
        window.location.reload();
    });
}

//pumps update and delete
var pumps = document.getElementById("delete_pumps");
if(pumps != null){
    pumps.addEventListener("click", function(){
        var ids = [];
        var pump = document.getElementsByClassName("pump_data");

        //Get ids to delete
        for(var i = 0; i < pump.length; i++){
            if(pump[i].childNodes[7].checked == true){
                ids.push(pump[i].childNodes[1].placeholder);
            }
        }

        //Delete ids in the list
        for(var i = 0; i < ids.length; i++){
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "/pumps/" + ids[i], true);
            xhttp.send();
        }

        window.location.reload();
    });
}

//plants update and delete
var plants = document.getElementById("delete_plants");
if(plants != null){
    plants.addEventListener("click", function(){
        var ids = [];
        var plant = document.getElementsByClassName("plant_data");

        //Get ids to delete
        for(var i = 0; i < plant.length; i++){
            if(plant[i].childNodes[7].checked == true){
                ids.push(plant[i].childNodes[1].placeholder);
            }
        }

        //Delete ids in the list
        for(var i = 0; i < ids.length; i++){
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "/plants/" + ids[i], true);
            xhttp.send();
        }

        window.location.reload();
    });
}

//tanks update and delete
var tanks = document.getElementById("delete_tanks");
var tanks1 = document.getElementById("update_tanks");
if(tanks != null){
    tanks.addEventListener("click", function(){
        var ids = [];
        var tank = document.getElementsByClassName("tank_data");

        //Get ids to delete
        for(var i = 0; i < tank.length; i++){
            if(tank[i].childNodes[7].checked == true){
                ids.push(tank[i].childNodes[1].placeholder);
            }
        }

        //Delete ids in the list
        for(var i = 0; i < ids.length; i++){
            var xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "/tanks/" + ids[i], true);
            xhttp.send();
        }

        window.location.reload();
    });

    tanks1.addEventListener("click", function(){
        data = document.getElementsByClassName("tank_data");
        for(var i = 0; i < data.length; i++){
            var id = data[i].childNodes[1].placeholder;
            var volume = data[i].childNodes[3].value;
            var pump_id = data[i].childNodes[5].value;

            //fill out empty data
            if(volume == "" || volume == null)
                volume = data[i].childNodes[3].placeholder;

            if(pump_id == ""){
                pump_id = data[i].childNodes[5].placeholder;
            
                //change to null value if still empty
                if(pump_id == "")
                    pump_id = "null";
            }

            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "/tanks/" + id + '/' + volume + '/' + pump_id, true);
            xhttp.send();
        }

        window.location.reload();
    });
}