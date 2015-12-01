<?php
$navbar = array(
    array('Blurbs', $root . 'index.php'), 
    array('Archive', $root . 'archive.php')
);
$navbarLeft = array(
    array('About', '#about')
);
?>
<nav class="navbar navbar-inverse navbar-fixed-top cm-nav">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<?php echo $root; ?>">codeMelon</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
            <?php
            $active = $navActive;
            foreach($navbar as $item) {
                include($templatePath . '_navbar-item.php');
            }
            ?>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <?php
            $active = $navLeftActive;
            foreach($navbarLeft as $item) {
                include($templatePath . '_navbar-item.php');
            }
            ?>
            </ul>
        </div>
    </div>
</nav>
