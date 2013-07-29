/*
  simpleMarquee © 2013 Michael Donaldson
  A simple continuous marquee plugin for jQuery.
  
  The MIT License (MIT)
  
  Copyright (c) 2013 Michael Donaldson
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

//Enclose plugin to protect the $ variable
(function($){
  //Simple Marquee Plugin
  $.fn.simpleMarquee = function(args){
    return this.each(function(){
      //Store this for future use
      var obj = $(this);
      //Cache items selector for later use
      var items = $("> div", obj);
      //Collective items width
      var itemsWidth = 0;
      
      //Default options
      var options = {
        //Speed of marquee in pixels per second
        speed: 15000,
        //Init event
        init: function(){},
        //Start event
        start: function(){},
        //Stop event
        stop: function(){},
        //Loop event (first parameter is the element that was moved to the end)
        loop: function(el){}
      };
      
      //Prepare the marquee before we start the animation
      var start = function(){
        if(!obj.hasClass("marqueeStarted")){
          //Define some default styles
          items.css({
            overflow: "auto",
            display: "inline-block"
          });
          //Get collective width of all elements (including margins padding and border)
          items.each(function(index, element){
            itemsWidth += $(element).outerWidth(true);
          });
          //Create new tardis
          var tardis = $('<div class="tardis" style="width:'+itemsWidth+'px;"></div>').append(items);
          //Clear marquee, add new tardis then apply some default styles
          obj.html("").append(tardis).css({
            overflow: "hidden"
          });
          //Fire init event
          options.init();
          //Start animation
          nextItem();
          //Add class to marquee
          obj.addClass("marqueeStarted marqueeMoving");
          //Fire start event
          options.start();
        }
      };
      
      //Animate next item
      var nextItem = function(){
        //Select next item to animate
        var currentItem = $(".tardis div:first-child", obj);
        //Get width of item
        var width = parseInt(currentItem.width(), 10);
        //Get offset from parent container
        var offset = currentItem.position().left;
        //Calculate animation time
        var time = ((Math.abs(width + offset)) / 1000) * options.speed;
        //Animate item
        currentItem.animate({
          "marginLeft": -width
        }, time, "linear", function(){
          //Move item to end of marquee and reset styles to default
          currentItem.insertAfter($(".tardis div:last-child", obj)).css("marginLeft", "0px");
          //Trigger next item animation
          nextItem();
          //Fire Loop event
          options.loop(currentItem);
        });
      };
      
      //Stop marquee on mouse over
      obj.mouseenter(function(){
        if(obj.hasClass("marqueeMoving")){
          obj.removeClass("marqueeMoving");
          $(".tardis div:first-child", obj).stop();
          //Fire stop event
          options.stop();
        }
      });
      
      //Restart marquee on mouse out
      obj.mouseleave(function(){
        if(!obj.hasClass("marqueeMoving") && !obj.hasClass("marqueeStopped")){
          obj.addClass("marqueeMoving");
          nextItem();
          //Fire start event
          options.start();
        }
      });
      
      ////////////////////////////
      ///////Plugin Methods///////
      ////////////////////////////
      
      //Start
      obj.start = function(){
        if(!obj.hasClass("marqueeMoving")){
          obj.addClass("marqueeMoving").removeClass("marqueeStopped");
          nextItem();
          //Fire start event
          options.start();
        }
      };
      
      //Stop
      obj.stop = function(){
        if(obj.hasClass("marqueeMoving")){
          obj.removeClass("marqueeMoving").addClass("marqueeStopped");
          $(".tardis div:first-child", obj).stop();
          //Fire stop event
          options.stop();
        }
      };
      
      //Check if user has passed any arguments, and what type they are
      if(typeof args == "string"){
        //String means we need to call a method
        obj[args]();
      } else if(typeof args == "object") {
        //Object means we need to set some options
        options = $.extend(options, args);
        start();
      } else {
        start();
      }
    });
  };
})(jQuery);