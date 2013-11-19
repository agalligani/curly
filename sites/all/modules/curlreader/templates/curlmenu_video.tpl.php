<?php $keyName = 'Video'; ?>
<?php $ifid = variable_get('video_image'); ?>
<?php $imgfile = file_load($ifid)->filename; ?>
<?php $image = file_create_url('public://'.$imgfile); ?>
<style type="text/css" media="all">
body #zone-menu {
   background: url('<?php print $image; ?>') no-repeat center top;
}
</style><div id='curlform_background'></div>
<?php $logoid = variable_get('video_logo'); ?>
<?php $imgfile = file_load($logoid); ?>
<?php $imgfilename = empty($imgfile) ? '':file_load($logoid)->filename; ?>
<?php $image = file_create_url('public://'.$imgfilename); ?>

<div id='curlmenu_background'></div>
<div id='curlform_overlay'>
<div id="curl-overlay-left">
<div id='curlform_logo' title='Video'><img src='<?php print $image; ?>'></div>
<!-- 
<nav id="landing-page-menu">
</nav> 
 -->
<nav class="nav-sprite first-nav-sprite clearfix featured-channels">
<h4>Featured Channels</h4>
  <a href=# id='MBA Program'>MBA Program</a>
  <a href=# id='Engaging Leaders'>Engaging Leaders</a>
  <a href=# id='Notes to the Next Class'>Notes to the Next Class</a>
</nav>
<nav class="nav-sprite clearfix">
<h4>Engage</h4>
<a href="http://www7.gsb.columbia.edu/video/feed" class="nav-sprite-rss" target="_blank"><span class='icon-18'></span>Video RSS</a>
</nav>
</div>
<div id='curlform_wrapper'>
  <form id='curlmenu' name='curlmenu'>
  <div id='reset' class='hidden'>Reset</div>
  <div class='curl-search-wrapper'>
    <div class='curl-search-button'></div>
      <input type="text" onfocus="this.value='';" class="curl-search" value="" placeholder="Search" />
  </div>
  <div class="checkbox-wrapper">
  <div class='hidden-checkbox'>
        <?php
         foreach($article_parents as $key => $name) {
              if($name == $keyName) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."' checked>";
              print "<label for='input_".$key."'>" . $name . "</label>";
              }
         }
        ?>
  </div> <!-- .hidden-checkbox -->        
   <?php /* note - nomenclature check for videos not necessary - left in for consistency. nomenclature is empty array... */ ?>

    <div class='hidden-checkbox' class='small'>Filter Stories: </div> 
           
      <div class="nom-checks-col-1">
        <?php
         $key_count = 0;
         foreach($nomenclature as $key => $name) {
         	if(!($key_count&1)) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."'>";
              print "<label for='input_".$key."'>" . $name . "</label>";
              print "<div class='checkbox-spacer'></div>";
            }
         $key_count = $key_count+1;
         }
        ?>

      </div> <!-- .checks-col-1 -->

      <div class="nom-checks-col-2">
        <?php
         $key_count = 0;
         foreach($nomenclature as $key => $name) {
         	if($key_count&1) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."'>";
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
<div class="curl-styled-select">
  <select id='category-select'>
  <option value=0>Channels</option>
  <?php
   foreach($categories as $key => $name) {
   		if($name != 'Video') {
   		  print "<option value='".$key."'>";
   		  print $name;
   		  print "</option>";
   		}
     }
  ?>
  </select>
</div><!-- END .curl-styled-select -->
</form>
</div>
</div>