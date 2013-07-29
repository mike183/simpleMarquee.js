#simpleMarquee.js

A simple continuous marquee plugin built for jQuery.

#Overview

When developing a site recently the client wanted a marquee to slide across the screen displaying their recent tweets. When looking at the standard marquee tag and some other jQuery marquee plugins I noticed that they all seemed to wait for the entire contents of the marquee to get the end of the screen before they would roll everything back to the beginning and start again.

What I wanted was something that once a tweet had moved off screen, it would be moved back to the end of the marquee ready to come back round later on.

#Usage

Using simpleMarquee.js is very simple and just like using most other jQuery plugins.

**Markup Requirements**  
simpleMarquee.js requires that you use the following markup (although you can feel free to add/remove/edit the ID's and classes):

    <div id="marquee">
      <div class="marqueeitem">Marquee Item 1</div>
      <div class="marqueeitem">Marquee Item 2</div>
      <div class="marqueeitem">Marquee Item 3</div>
      <div class="marqueeitem">Marquee Item 4</div>
    </div>

**Start**  
Starting the plugin is very simple, just use something similar to the code below and that's it, you can sit there and happily watch your marquee scroll until the end of time.

    var marquee = $("#marquee").simpleMarquee();

#Options / Events / Methods
What good would a plugin be without at least some options, events and even some methods to play around with?

**Option / Events**  
Using options and events in simpleMarquee.js is just the same as using them in any other plugin, see the example below for usage and a list of options and events along with their default values:

    $("#marquee").simpleMarquee({
      "speed": 15000, //Measured in pixels per second
      "init": function(){}, //Triggered when the marquee has finished initialising
      "start": function(){}, //Triggered when ever the marquee is started
      "stop": function(){}, //Triggered when ever the marquee is stopped
      "loop": function(el){} //Triggered when an item in the marquee is moved back to the end of the queue of items, first parameter is the element that was moved.
    });

**Methods**  
Using methods in simpleMarquee.js is very simple, assuming you have setup the plugin using the code in these docs you should be able to access the simpleMarquee.js instance using the variable ***marquee***, see the example below for a list of methods and their usage:

    //Stop
    marquee.simpleMarquee("stop"); //Stops the marquee (also triggers the stop event)
    
    //Start
    marquee.simpleMarquee("start"); //Starts the marquee (also triggers the start event)

#End
Well that brings us to the end of the docs, I hope I have explained everything clearly but if there are any issues or you have any suggestions, bring it up in an issue or submit a pull request and I will be glad to take a look.

Enjoy!