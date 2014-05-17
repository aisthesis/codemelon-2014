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

        <div class="cm-header">
            <div class="container">
                <div class="row">
                    <div class="col-md-1">
                        <img src="images/melon.png" alt="Melon" width="64" height="64">
                    </div>
                    <div class="col-md-11">
                        <h1><?php echo $mappings[$_GET['id']]['heading']; ?></h1>
                    </div>
                </div>
            </div>
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

        <?php
            include($templatePath . '_requirejspath.php');
        ?>
        <script src="<?php echo $pathToRequirejs; ?>require.js" data-main="scripts/main"></script>
    </body>
</html>
