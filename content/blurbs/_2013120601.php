<?php
/**
 * JavaScript Multi-threading
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Marshall Farrier
 * @edited 2013-12-06
 */
?>
<h2>Multi-threading in JavaScript <small><?php echo $date; ?></small></h2>
<p>JavaScript runs in a single thread. Don't let yourself be told otherwise!
Ajax calls, <code>setTimeout()</code>, and <code>setInterval()</code> all run
in one thread and just cause an action to be pushed onto the stack to be run when its
turn comes around. With one exception: <em>Workers</em>, which are supported in all
browsers. You can create a worker using the syntax <code>var worker = new Worker('worker.js');</code>
and communicate with it using an <code>onmessage</code> callback. Workers don't
have access to the DOM but are useful for offloading computationally intensive
JavaScript that could bog down the main thread. Further implementation details
on <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers" target="blank">MDN</a>.
Additional comments and some performance tests in John Resig's <a href="http://ejohn.org/blog/web-workers/"
target="blank">blog</a>.
</p>
