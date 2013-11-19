<?php $logo = drupal_get_path('theme','curl').'/images/curl_logo.png'; ?>
<?php $image = drupal_get_path('theme','curl').'/images/curl.jpg'; ?>
<style type="text/css" media="all">
body.front #zone-menu {
   background: url('<?php print $image; ?>') no-repeat center top;
}
</style>
<div id='curlform_background'></div>
<div id='curlmenu_background'></div>
<div id='curlform_overlay'>
<!-- <div id='curlform_logo' title='THE CURL: Ideas to Wrap Your Mind Around'><img src='<?php print $image; ?>' style='max-width: 100%;'></div> -->
<div id='curlform_logo' title='THE CURL: Ideas to Wrap Your Mind Around'><img src='<?php print $logo; ?>' style='max-width: 100%;'></div>
<div id='curlform_wrapper'>
  <form id='curlmenu' name='curlmenu'>
  <div id='reset' class='hidden'>Reset</div>
  <div class='curl-search-wrapper'>
    <div class='curl-search-button'></div>
      <input type="text" onfocus="this.value='';" class="curl-search" value="" placeholder="Search" />
  </div>
  <div class="checkbox-wrapper">
    <div class='small'>Filter Stories: </div>    
      <div class="checks-col-1">
        <?php
         $key_count = 0;
         foreach($article_parents as $key => $name) {
         	if(!($key_count&1)) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."' checked>";
              print "<label for='input_".$key."'>" . $name . "</label>";
              print "<div class='checkbox-spacer'></div>";
            }
         $key_count = $key_count+1;  
         }
        ?>

      </div> <!-- .checks-col-1 -->

      <div class="checks-col-2">
        <?php
         $key_count = 0;
         foreach($article_parents as $key => $name) {
         	if($key_count&1) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."' checked>";
              print "<label for='input_".$key."'>" . $name . "</label>";
              print "<div class='checkbox-spacer'></div>";
            }
         $key_count = $key_count+1;
         }
        ?>
     </div><!-- .checks-col-1 -->

  </div><!-- .checkbox-wrapper -->

  </select>
<div class="curl-styled-select">
  <select id='topic-select'>
  <option value=0>Tags</option>
  <?php
   foreach($topics as $key => $name) {
   		print "<option value='".$key."'>";
   		print $name;
   		print "</option>";
   }
  ?>
  </select>

</div><!-- END .curl-styled-select -->
</form>
</div>
</div>