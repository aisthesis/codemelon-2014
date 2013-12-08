<?php
function handle_to_date($handle) {
    return substr($handle, 0, 4) . '-' . substr($handle, 4, 2) . '-' . substr($handle, 6, 2);
}
?>
