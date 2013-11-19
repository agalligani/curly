<?php $ifid = variable_get('chazen_image'); ?>
<?php $imgfile = file_load($ifid)->filename; ?>
<?php $image = file_create_url('public://'.$imgfile); ?>
<style type="text/css" media="all">
body #zone-menu {
   background: url('<?php print $image; ?>') no-repeat center top;
}
</style><div id='curlform_background'></div>
<?php $logoid = variable_get('chazen_logo'); ?>
<?php $imgfile = file_load($logoid); ?>
<?php $imgfilename = empty($imgfile) ? '':file_load($logoid)->filename; ?>
<?php $image = file_create_url('public://'.$imgfilename); ?>

<div id='curlmenu_background'></div>
<div id='curlform_overlay'>
<div id="curl-overlay-left">
<div id='curlform_logo' title='Chazen Global Insights'><img src='<?php print $image; ?>'></div>
<nav id="landing-page-menu">
<h4>About</h4>
<a href="http://www8.gsb.columbia.edu/chazen/globalinsights/about">Jerome A. Chazen Institute of
International Business Main Page</a>
</nav> 
<nav class="nav-sprite clearfix">
<h4>Engage</h4>            
	<a href="http://visitor.r20.constantcontact.com/d.jsp?llr=9yg6xvgab&p=oi&m=1106683796250" class="nav-sprite-email" target="_blank">
<span class="icon-18"></span>Get Email Updates
</a>
<a href="http://www.facebook.com/pages/The-Chazen-Institute-of-International-Business-at-Columbia-Business-School/187750474591661" class="nav-sprite-fb" target="_blank">
<span class="icon-18"></span>
Facebook
</a>
<a href="http://www8.gsb.columbia.edu/chazen/globalinsights/rss" class="nav-sprite-rss" target="_blank">
<span class="icon-18"></span>RSS
</a>
<a href="http://www.youtube.com/user/ColumbiaBusiness#g/c/01D6CA2FDCC9072A" class="nav-sprite-youtube" target="_blank">
<span class="icon-18"></span>
YouTube
</a>
</nav>
<!-- 
<nav class="nav-sprite clearfix">
<a href="http://visitor.r20.constantcontact.com/d.jsp?llr=9yg6xvgab&p=oi&m=110668379" class="nav-sprite-1" target="_blank">Get Email Updates</a>
<a href="http://www.facebook.com/pages/The-Chazen-Institute-of-International-Business-at-Columbia-Business-School/187750474591661" class="nav-sprite-2" target="_blank">Facebook</a>
<a href="http://www8.gsb.columbia.edu/chazen/globalinsights/rss" class="nav-sprite-3" target="_blank">Global Insights RSS</a>
<a href="http://www.youtube.com/user/ColumbiaBusiness#g/c/01D6CA2FDCC9072A" class="nav-sprite-4" target="_blank">YouTube</a>
</nav>
 -->
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
              if($name == "Chazen Global Insights") {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."' checked>";
              print "<label for='input_".$key."'>" . $name . "</label>";
              }
         }
        ?>
  </div> <!-- .hidden-checkbox -->        
    <div id='nom-checks' class='small'>Filter Stories: </div>            
      <div class="nom-checks-col-1">
        <?php
         $key_count = 0;
         foreach($nomenclature as $key => $name) {
         	if(!($key_count&1)) {
              print "<input type='checkbox' name='".$name."' value='".$key."' id='input_".$key."' checked>";
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