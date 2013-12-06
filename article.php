<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
    // map of articles to category to use in page title
    include($root . 'content/details/titles.php');
    $sectionTitle = $titles[$_GET['id']];
    include($templatePath . 'head.php');
    ?>
    <body>
        <?php
        $navbar = array(
            array('Blurbs', $root . 'index.php'), 
            array('Archive', '#')
        );
        $navActive = '';
        $navbarLeft = array(
            array('About', '#')
        );
        $navLeftActive = '';
        include($templatePath . 'header.php');
        ?>

        <div class="cm-header">
            <div class="container">
                <div class="row">
                    <div class="col-md-1">
                        <img src="images/melon.png" alt="Melon" width="64" height="64">
                    </div>
                    <div class="col-md-11">
                        <h1>Marshall Farrier's tech blog</h1>
                    </div>
                </div>
                <p class="lead">Commentary, coding tips, libraries and utilities</p>
            </div>
        </div>

        <div class="container">
            <div class="page-content">
                <div class="row">
                    <div class="col-md-9" role="main">
                        <div class="cm-article">
                         <?php
                         $articleUrl = 'content/details/_' . $_GET['id'] . '.php';
                         if (is_readable($articleUrl)) {
                             include($articleUrl);
                         }
                         else {
                             echo '<div id="cm-article-not-found">';
                             echo '<div class="alert alert-warning"><strong>Article unavailable.</strong> ';
                             echo 'Please return to the <a href="' . $root . 'index.php">home page</a> ';
                             echo 'for links to available content.</div>';
                             echo '</div>';
                         }
                         ?>
                        </div>
                    </div>

                    <?php
                    include('templates/sidebar.php');
                    ?>
                </div>
            </div>
        </div>

        <script src="scripts/require.js" data-main="scripts/main"></script>
    </body>
</html>
