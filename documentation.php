<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
    include($root . 'common.php');
    // map of articles to category to use in page title
    include($root . 'content/documentation/mappings.php');
    $sectionTitle = $mappings[$_GET['id']]['title'];
    include($templatePath . '_head.php');
    ?>
    <body>
        <?php
        $navActive = '';
        $navLeftActive = '';
        include($templatePath . '_header.php');
        ?>

        <div class="container" role="main">
            <div class="jumbotron">
                <h1>
                    <img src="images/melon.png" alt="Melon" width="64" height="64">
                    <?php echo $mappings[$_GET['id']]['heading']; ?>
                </h1>
            </div>

            <div class="container">
                <div class="page-content">
                    <div class="row">
                        <div class="col-md-12" role="main">
                        <?php
                        echo "<iframe src='{$root}content/documentation/{$_GET['id']}' ";
                        echo "width='{$mappings[$_GET['id']]['width']}' ";
                        echo "height='{$mappings[$_GET['id']]['height']}'></iframe>";
                        ?>
                        </div>
                    </div>
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
