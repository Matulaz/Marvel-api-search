$(document).ready(function(){
    let $navBar = $(".nav-bar")
    $($navBar).hide().fadeIn(700);
    
});


(function(){
    
 //Primero traigo todos los Avengers

        const privateKey = "0f6bc8cd0682c7892d47ca05b019ab4d6f216657";
        const publicKey = "09637f3475b9823b0bf79f69e9e84201";
        const maxCharacters = 1500;
        
        
        
        
        function createHash(timeStamp) {
            
            const toBeHashed = timeStamp + privateKey + publicKey;
            const hashedMessage = md5(toBeHashed);
            return hashedMessage;
            
        }
        
        //timestamp
        const timeStamp = 1;
        //avenger random para el index
        const offset = Math.floor((Math.random() * maxCharacters) + 1); 
        //validar hash
        const hash = createHash(timeStamp);
        // define el limite por pagina
        let limit = "28"; 


var xhttp = new XMLHttpRequest(); 
let url = "https://gateway.marvel.com:443/v1/public/characters?&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash+"&limit="+limit;


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var resApi = JSON.parse(this.responseText); // recibe respuesta del servidor
        var data = resApi["data"]["results"]; //accedo al objeto con los avengers
        console.log(data); //ver los datos por consola
        getAvengers(data); //esto es lo que hace con los results si no hay parametro de busqueda
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    


function getAvengers(data){
    var resToHtml = "";

    console.log(data[0].thumbnail.path)
    
    
    for (var i = 0; i< data.length; i++){   
        resToHtml +='<div class="avengerCard">' +
        '<a class="link" href="' + data[i].urls + '">' +
        '<img class="ratio" src="'+
                    data[i].thumbnail.path + "." + data[i].thumbnail.extension + '"'+ ">" +
                    '<h3 name="avengerName">' + data[i].name + "</h3>" + 
                    '</a><br>' +
                    "</div";
                    resToHtml += '\n<ul>'
                    resToHtml += '</ul>'

    }
    if (data.next) {
        xmlhttp.open('GET', data.next, true) // Si hay una próxima página realizo un nuevo pedido
        xmlhttp.send()  // Envío el pedido
    }
    document.querySelector("#character").innerHTML += resToHtml  // Agrego el html al div personajes
    
};




//Acá busco Avengers por nombre 

function getAvengersByName(data){
    

    console.log("data: " + data); // veo la data que llega de la API
    jQuery('#character').html(''); //Borro los elementos renderizados del inicio

    var data2 = data["data"]["results"];

    console.log(data2);
    

    var resToHtml = "";
    
    for (var i = 0; i< data2.length; i++){   
        resToHtml +='<div class="avengerCard">' +
        '<a class="link" href="' + data2[i].urls + '">' +
        '<img class="ratio" src="'+
                    data2[i].thumbnail.path + "." + data2[i].thumbnail.extension + '"'+ ">" +
                    '<h3 name="avengerName">' + data2[i].name + "</h3>" + 
                    '</a><br>' +
                    "</div";
                    resToHtml += '\n<ul>'
                    resToHtml += '</ul>'

    }
    if (data2.next) {
        xmlhttp.open('GET', data2.next, true) // Si hay una próxima página realizo un nuevo pedido
        xmlhttp.send()  // Envío el pedido
    }
    document.querySelector("#character").innerHTML += resToHtml  // Agrego el html al div personajes


};


    $('#myForm').submit(function(e) {
      e.preventDefault();

      var $search = $('#myForm #search').val();

      console.log($search)

      var $parametro; //parametro de busqueda
      $search ? $parametro = "nameStartsWith=" : $parametro=""; // si hay search, hay hay parametro
      $.ajax({
          

          url : `https://gateway.marvel.com:443/v1/public/characters?${$parametro}${$search}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}`,
          type : 'GET',
          dataType:'json',
            success : function(data) {              
                console.log(data);
                getAvengersByName(data);
            },
            error : function(request,error)
            {
                console.log("Request: "+JSON.stringify(request));
            }
        });
        
    });
})()

