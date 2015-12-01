<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
    include($root . 'common.php');
    $sectionTitle = 'Archive';
    include($templatePath . '_head.php');
    ?>
    <body>
        <?php
        $navActive = 'Archive';
        $navLeftActive = '';
        include($templatePath . '_header.php');
        ?>

        <div class="container" role="main">
            <div class="jumbotron">
                <h1>
                    <img src="images/melon.png" alt="Melon" width="64" height="64">
                    Marshall Farrier's tech blog
                </h1>
                <p class="lead">Commentary, coding tips, libraries and utilities</p>
            </div>

            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-9" role="main">
                            <div class="cm-feed">
                                <div class="page-header">
                                    <h1>Archive</h1>
                                </div>
                               
                                <?php
                                $d = dir('content/archive');
                                $path = $d->path;
                                $articleMain = $root . 'article.php?id=';
                                $suffix = '.php';
                                $prefix = '_';
                                $handles = array();
                                while($entry = $d->read()) {
                                    if (strpos($entry, $prefix) === 0 && substr($entry, -strlen($suffix)) === $suffix) {
                                        $handles[] = substr($entry, strlen($prefix), -strlen($suffix));
                                    }
                                }
                                $d->close();
                                rsort($handles);
                                foreach($handles as $handle) {
                                    include('templates/_blurb.php');
                                }
                                ?>

                            </div>
                        </div>

                        <?php
                        include('templates/_sidebar.php');
                        ?>
                    </div>
                    <div class="row cm-spacer-large">&nbsp;</div>
                </div>
            </div>
        </div>

        <?php
            include($templatePath . '_requirejspath.php');
        ?>
        <script src="<?php echo $pathToRequirejs; ?>require.js" data-main="scripts/main"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-51517314-1', 'codemelon.com');
            ga('send', 'pageview');

        </script>

    </body>
</html>
