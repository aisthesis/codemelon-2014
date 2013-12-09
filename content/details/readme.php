<?php
/**
 * To write an article:
 * 1) Name its file the same as the name used for its blurb, but in the ./content/details/
 *    directory. The blurb will then
 *    automatically provide the correct link.
 * 2) Write the article with html formatting as below. The tags just need to be internally
 *    consistent inside of an external <div> into which this file is inserted.
 *    Be sure to wrap the content in a <div class="media"> tag if images
 *    are included. Otherwise the padding for the float won't be right.
 * 3) Go to categories.php in this directory and enter the category for the
 *    article. This is the term that will appear in the corresponding browser tab.
 */
?>
<div class="page-header">
    <h2>Object-oriented JavaScript <small>2013-12-03</small></h2>
</div>
<div class="media">
    <p>Lorem ipsum</p>

<pre class="prettyprint linenums lang-js">
$(document).ready(function() {
    alert('this is a line');
    alert('this is another line');
});
</pre>
</div>
