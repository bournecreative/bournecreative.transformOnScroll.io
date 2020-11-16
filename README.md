# Image transform on scroll

This effect is comprised of 3 scenes within a master scene. Once the user scrolls into the master scene, these layered sub scenes are revealed only once their respective trigger point is reached. There is also a image set within the master scene. It's position is transformed during each scene to hide and reveal the image.

![Reveal on scroll gif](resources/revealOnScroll.gif)


## Details
This effect is acheived using scroll magic and some creative javascript. This is an example of effects I prototype.


* Entering and leaving each scene triggers sets the active scene that reveals the panel and its content.
* The image technically sits ontop each of the sub scenes. There is a configuration that maps trigger points, scene and tween parameters.  The position and scale of the image are tweened based on tween arguments related to each scene.


### Demo

[image transform on scroll demo](https://bournecreative.github.io/bournecreative.revealOnScroll.io/)

Built with vanilla javascript, scss, scroll magic, green sock using ES6 modules, and using laravel mix for the project build.
