<!DOCTYPE html>
<html>
    <?php
    $root = './';
    $templatePath = $root . 'templates/';
    $sectionTitle = 'Blurbs';
    include($templatePath . '_head.php');
    ?>
    <body>
        <?php
        $navbar = array(
            array('Blurbs', $root . 'index.php'), 
            array('Archive', '#')
        );
        $navActive = 'Blurbs';
        $navbarLeft = array(
            array('About', '#')
        );
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
                        <div class="cm-feed">
                            <div class="page-header">
                                <h1>Blurbs</h1>
                            </div>
                           
                            <?php
                            $d = dir('content/blurbs');
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
            </div>
        </div>

        <script src="scripts/require.js" data-main="scripts/main"></script>
    </body>
</html>
