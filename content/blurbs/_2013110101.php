<?php
/**
 * Java MinHeap
 * Copyright (c) 2013 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Marshall Farrier
 * @edited 2013-12-05
 * 
 * To create a new blurb:
 * 1) Copy this file to a file of the form `_<yyyymmdd><00>.php`
 *    in the current directory
 * 2) Edit the content of the blurb
 * 3) Delete or edit the `More` link at the bottom if
 *    there is no link to a corresponding article or
 *    the reference should link elsewhere
 */
?>
<h2>Java MinHeap implementation <small>2013-11-01</small></h2>
<p>Working recently on a problem requiring Dijsktra's algorithm, I noticed
that Java's native PriorityQueue is missing a necessary <code>decreaseKey()</code>
method. I feel sure that the reason for this omission is that this method inevitably exposes
too much of the inner workings of the data structure. Specifically, it doesn't make
a lot of sense without also implementing a <code>find()</code> method which
in turn presupposes that the priority queue is backed by an array (minimally: some 
object with indices). I agree that exposing the array index is a little ugly, but we really
do need a <code>decreaseKey()</code> method. So, I've implemented a <code>MinHeap&lt;T&gt;</code>
that does everything that Java's <code>PriorityQueue&lt;T&gt;</code> does but adds
the missing method. For shared functionality, the implementation of 
<code>com.codemelon.util.MinHeap&lt;T&gt;</code> closely follows 
<code>java.util.PriorityQueue&lt;T&gt;</code> (source 
<a href="http://hg.openjdk.java.net/jdk7/jdk7/jdk/file/tip/src/share/classes/java/util/PriorityQueue.java" target="blank">here</a>)
but in some spots prefers performance over safety.
The code for <code>com.codemelon.util.MinHeap&lt;T&gt;</code> can be viewed and downloaded on
<a href="https://github.com/aisthesis/min-heap" target="blank">GitHub</a>.
<?php
//echo "<a href='$details'>here</a>.";
?>
</p>
