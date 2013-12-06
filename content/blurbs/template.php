<?php
/**
 * Template for blurbs
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
<h2>Title <small><?php echo $date; ?></small></h2>
<p>Experiences with require.js
<?php
echo "<a href='$details'>More</a>";
?>
</p>
