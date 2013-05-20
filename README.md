# Before and After Slider

This is my attempt at creating a before after slider that is both responsive and mobile-friendly.

## Demo

Download this repo or you can view it on [http://mynameisvince.com/baslider/](http://mynameisvince.com/baslider/)

## Instructions

1.  Include 'baslider.js' on your page. 
2.  Include 'baslider.css' on your page. You can also put this in your stylesheets if you fancy. 
3.  Use the following format to create a slider:

		<div class="ba-slider">
			<img src="img/slider-1a.jpg" alt="" />
			<img src="img/slider-1b.jpg" alt="" />
		</div>

4. Initialize BASlider on the windows load event:

		window.onload = function () {
			$('.ba-slider').beforeAfter();
		}
5. Celebrate! 

## Styling

Everything is CSS-driven. Pull up your inspector to tweak things to your liking. 

Important classes:

- '.ba-control-bar' - This is the line that splits your two images. 
- '.ba-control-handle' - This is a rectangular handle that is centered on the bar.
- '.ba-left-arrow' & '.ba-right-arrow' - Arrows!

__Note:__ The arrows are positioned absolute so if you change their dimensions you will have to change the margins that help center them. 