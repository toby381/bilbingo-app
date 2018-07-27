/** 
  * @desc FIRE THE GAME and loading libraries
  * 
  * @author Torbjørn Høvde torbjorn.hovde@gmail.com
  * @required 
*/


if ( localStorage.getItem("isPhoneGap") ) {
   
    document.addEventListener("deviceready", onDeviceReady, false);
} else {

  $(document).ready(function(){
 onDeviceReady();
});
}


 

function onDeviceReady() {
  
    
    //init sound
    $.ionSound({
        sounds: [
            "button_click",
             "door_bump"
        ],
        path: "sounds/",                
        multiPlay: true,               
        volume: "1"                   
    }); 
    
    
    Board.setBoard(5,5); 
    Board.resizeBoard();

    /*int button*/
   if ( localStorage.getItem("isPhoneGap") ) {
             $( "div.box" ).bind( "touchstart", Board.tapHandler );
        } else {
             $( "div.box" ).bind( "tap", Board.tapHandler );
        } 
   
}

