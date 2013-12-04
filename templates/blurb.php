<div id="<?php echo $handle; ?>" class="panel panel-default">
    <div class="panel-body">
    <?php
    $details = $articleMain . $handle;
    include($path . '/' . $prefix . $handle . $suffix);
    ?>
    </div>
</div>
