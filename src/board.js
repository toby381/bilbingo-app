/** 
  * @desc this module holds the creation and interaction width the game board
  * - symbolTotal: number of icons in library
  * @author Torbjørn Høvde torbjorn.hovde@gmail.com
  * @required 
*/

var Board = (function () {
    

    
    var rowTotal = 5;
    var colTotal = 4;

    var count=0; 
    var symbols = ["elgskilt","hest","lastebil","sykkel","barnevogn","kirke"];
    var symbolTotal=symbols.length;
    var list = new Array();
    var lines = 0;
    
    //load images
    /*$.preload( './assets/background-splash.png',
      './assets/background1.png',
      './assets/star.png',
      './symbol/elgskilt.png',
        './symbol/hest.png',
        './symbol/lastebil.png'
    );*/
  
/**
  * @desc play sounds
  * @param String snd - sound identification string
  * @return nothing
*/     
    var _playSound = function (snd) {
            $.ionSound( {sounds: [snd], path: "sounds/", multiPlay: true,volume: "0.4" } ); 
            $.ionSound.play(snd);
    }

/**
  * @desc checks for completed line in game
  * @param Integer id - the position-id of the clicked element
  * @return Boolean - true/false
*/   
     var  _checkLine = function(id) {
         min = Math.floor(id/colTotal)*colTotal;
         max = min + colTotal;
         check = true;
         for ( var i = min; i < max; i++ ) {
            if(list[i] > 0) {
                check = false;
            }
         }

         return check;
    }
     
/**
  * @desc search for element position-id based on css-id
  * @return Integer - element position-id
*/   
    var _getNumberFromID = function(id_str,label) {
        return Number(id_str.split(label)[1]);
    }    
   
    
/**
  * @desc creates the board
  * @param integer rowTotals - Number of rows
  * @param integer colTotals - Number of columns
  * @return nothing
*/    
    var setBoard = function (c,r) {
        rowTotal = r;
        colTotal = c;

        for ( var i = 0; i < rowTotal; i++ ) {
            r=document.createElement('div');
            $(r).addClass('row').appendTo($("#board")).attr('id', 'line'+i).html('<div class="line"></div>');
            for ( var j = 0; j < colTotal; j++ ) {
                c=document.createElement('div');
                //do {
                    var new_number = true;
                    var number = 1 + Math.floor(Math.random() * symbols.length);
                     for ( var x = 0; x < list.length; x++ ) { if(list[x] ==  number) new_number = false; break;}
                //} while(!new_number);
                if(j>0) binder='<img class="binder" src="assets/binder.svg">';
                else binder='';
                $(c).addClass('box').attr('id', 'symbol'+count).appendTo( $(r) ).html(binder+'<img class="star" src="assets/star.svg"><img class="tile" src="assets/tile.png"><img class="check" src="assets/tile_check.png"><img class="symbol" src="symbol/' + symbols[number-1] + '.png">');
                count++;
                list.push(number);
            }
        }
    } 

     var resetBoard = function () {
        $("#board").empty();
        setBoard(colTotal,rowTotal);
        resizeBoard();
         
         if ( localStorage.getItem("isPhoneGap") ) {
             $( "div.box" ).bind( "touchstart", Board.tapHandler );
        } else {
             $( "div.box" ).bind( "tap", Board.tapHandler );
        }
     }
    
    var _animCheck = function (target) {
        check = target.children('.check'); //div.box img.check
        check.css('display','block');
        check.addClass('popin');
        //check.show("scale",{}, 1000);
    }
    var _animStar = function (target) {
        var down_size = target.parent().width()*0.1;
        star = target.children('.star');// div.box img.star
        star.css('display','block');
        star.css('width',down_size+'px').css('height',down_size+'px');
    }
    var _animSymbol = function (target) {
        var down_size = 0.7;
        var size= target.width()*down_size;
        symbol = target.children('.symbol');// div.box img.symbol
        symbol.css('width',size+'px').css('height',size+'px');
    }
/**
  * @desc handles interaction
  * @return nothing
*/    

    var tapHandler = function ( event ){
        if($( event.target ).hasClass('symbol')) {
            
            var target = $( event.target ).parent(); // div.box
            target.unbind();
            _animCheck(target);
            _animStar(target);
            _animSymbol(target);
 
            id_str = target.attr('id');
            id = _getNumberFromID(id_str,"symbol");

            list[id] = 0;
            
            _playSound('button_click');
            if(_checkLine(id)) {

                lines++;
                //if(lines == rows) alert('fullt hus!');
                var binder = target.parent().find('.binder');
                binder.css('display','block');
                 _playSound('bell_ring');
                navigator.vibrate( 1000 );
            }
        }
    }
    var resizeBoard = function () {
        var gameArea = $('div#game div#board-wrapper');
        var widthToHeight = colTotal / rowTotal;
        var marginToWidth= (7/(667));
        var newWidth = window.innerWidth*1;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            gameArea.height(newHeight);
            gameArea.width(newWidth);
        } else {
            newHeight = newWidth / widthToHeight;
            gameArea.height(newHeight);
            gameArea.width(newWidth);
        }
        
        gameArea.css("marginTop",(-newHeight / 2)+ 'px');
        gameArea.css("marginLeft",(-newWidth / 2) + 'px');

        var tile = $('#board .box, .box img').not('.star');
        var binder_tile = $('.box img.binder');
        var m=marginToWidth * (newWidth*0.78);
        var w = ( ((newWidth)/5)-(m*2) )*0.78;
        var binder_w =w*(30/95);
      
        tile.width(w);
        tile.height(w);
        binder_tile.width(binder_w);
        binder_tile.height(binder_w);
        $('#board .box').css("margin",m + 'px');
        
        window.addEventListener('resize', Board.resizeBoard, false);
        window.addEventListener('orientationchange', Board.resizeBoard, false);
        
        
    };
  
    return {
        setBoard: setBoard,
        resizeBoard: resizeBoard,
        resetBoard: resetBoard,
        tapHandler:  tapHandler
    };

})();

