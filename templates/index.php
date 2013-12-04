<!DOCTYPE html>
<html>
    <head>
        <title>codeMelon|Blurbs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="styles/app.css" rel="stylesheet" media="screen">
    </head>
    <body>
        <header class="navbar navbar-inverse navbar-fixed-top cm-nav">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="http://www.codemelon.com"">codeMelon</a>
                </div>
                <nav>
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a href="#">Blurbs</a>
                        </li>
                        <li>
                            <a href="#">Archive</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="#">About</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

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
                                include('templates/blurb.php');
                            }
                            ?>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="cm-sidebar">
                            <div class="cm-sidebar-container">
                                <img src="images/Marshall2012.jpg" alt="Marshall" class="img-rounded" width="128"
                                    height="128">
                                <h4>Projects</h4>
                                <h4>Utilities</h4>
                                <h4>Downloads</h4>
                                <h4>Documentation</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="scripts/require.js" data-main="scripts/main"></script>
    </body>
</html>
