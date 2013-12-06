<div id="<?php echo $handle; ?>" class="panel panel-default">
    <div class="panel-body">
    <?php
    $details = $articleMain . $handle;
    $date = substr($handle, 0, 4) . '-' . substr($handle, 4, 2) . '-' . substr($handle, 6, 2);
    include($path . '/' . $prefix . $handle . $suffix);
    ?>
    </div>
</div>
