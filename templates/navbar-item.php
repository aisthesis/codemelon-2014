<li>
<?php
if ($item[0]=== $active) {
    echo '<li class="active">';
}
else {
    echo '<li>';
}
echo "<a href='$item[1]'>$item[0]</a>";
?>
</li>
