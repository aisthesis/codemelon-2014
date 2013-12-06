<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
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
        </div>

        <script src="scripts/require.js" data-main="scripts/utilities/<?php echo $_GET['id']; ?>/main"></script>
    </body>
</html>
