<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
    include($root . 'common.php');
    // map of articles to category to use in page title
    include($root . 'content/utilities/mappings.php');
    $sectionTitle = $titles[$_GET['id']];
    include($templatePath . '_head.php');
    ?>
    <body>
        <?php
        $navActive = '';
        $navLeftActive = '';
        include($templatePath . '_header.php');
        ?>

        <div class="container">
            <div class="page-content">
             
             <?php
             $utilityUrl = 'content/utilities/_' . $_GET['id'] . '.php';
             if (is_readable($utilityUrl)) {
                 include($utilityUrl);
             }
             else {
                 echo '<div id="cm-utility-not-found">';
                 echo '<div class="alert alert-warning"><strong>Utility unavailable.</strong> ';
                 echo 'Please return to the <a href="' . $root . 'index.php">home page</a> ';
                 echo 'for links to available content.</div>';
                 echo '</div>';
             }
             ?>
        
            </div>
            <div class="row cm-spacer-large">&nbsp;</div>
        </div>

        <?php
            include($templatePath . '_requirejspath.php');
        ?>
        <script src="<?php echo $pathToRequirejs; ?>require.js" data-main="scripts/utilities/<?php echo $_GET['id']; ?>/main"></script>
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
