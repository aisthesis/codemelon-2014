<header class="navbar navbar-inverse navbar-fixed-top cm-nav">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="<?php echo $root; ?>">codeMelon</a>
        </div>
        <nav>
            <ul class="nav navbar-nav">
            <?php
            $active = $navActive;
            foreach($navbar as $item) {
                include($templatePath . 'navbar-item.php');
            }
            ?>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <?php
            $active = $navLeftActive;
            foreach($navbarLeft as $item) {
                include($templatePath . 'navbar-item.php');
            }
            ?>
            </ul>
        </nav>
    </div>
</header>
