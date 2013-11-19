<div<?php print preg_match("/featured/i", $attributes) ? " class=\"item featured-article\"" : " class=\"item\""; ?>>
<article<?php print $attributes; ?>>
  <div class='eyebrow'>
    <div class='publication'>
        <a href='#' id='pubTid-<?php print($node->field_curlitem_category_parent[$node->language][0]['tid']); ?>'>
    <?php
   		$publication = !empty($node->field_curlitem_category_parent[$node->language][0]['tid'])? taxonomy_term_load($node->field_curlitem_category_parent[$node->language][0]['tid'])->name:'Unclassified';
   		print $publication;
   	?>
   	   </a>
    </div> <!-- .publication -->
    <div class='nomenclature'>
        <?php $nom_tid = !empty($node->field_curlitem_nom[$node->language][0]['tid']) ?  $node->field_curlitem_nom[$node->language][0]['tid'] : NULL ?>
   		<?php if(!empty($nom_tid)) {
   		?>
      <a href='#' id='nomTid-<?php print($node->field_curlitem_nom[$node->language][0]['tid']); ?>'>
   		<?php	print taxonomy_term_load($nom_tid)->name; ?>
   		</a>
   		<?php
   		}
   		?>
    </div> <!-- .nomenclature -->

    <div class='category'>
            <?php $cat_split = !empty($node->field_curlitem_category[$node->language][0]['tid'])?explode(':',taxonomy_term_load($node->field_curlitem_category[$node->language][0]['tid'])->name) : null; ?>
   		<?php if(!empty($cat_split[1])) {
   		?>

      <a href='#' id='catTid-<?php print($node->field_curlitem_category[$node->language][0]['tid']); ?>'>
   		<?php	print $cat_split[1]; ?>
   		</a>
   		<?php
   		}
   		?>
      </div> <!-- .category -->
    <div class='contractor'>-</div>
    </div> <!-- .eyebrow -->

    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
	?>
<div class='article-image-wrapper'>
	<?php

	  if(!empty($node->field_curlitem_img[$node->language][0]['fid'])) {
	     print render(theme('image_style',array('style_name'=>'curl_large','path'=>file_load($node->field_curlitem_img[$node->language][0]['fid'])->uri)));
	  	} else {

	      if(!empty($node->field_curlitem_pub_img_url[$node->language][0]['value'])) {
            $img = $node->field_curlitem_pub_img_url[$node->language][0]['value'];
            $img_w = $node->field_curlitem_pub_img_w[$node->language][0]['value'];
            $img_h = $node->field_curlitem_pub_img_h[$node->language][0]['value'];
            if($img_w > 0) {
              $derived_img_w = $img_w > 421 ? 421 : $img_w;
              $derived_img_h = ($img_h * ($derived_img_w % $img_w));
              print "<img src='".$img."' width='".$derived_img_w." height='".$derived_img_h."'>";
             }
        }
     }
    ?>
</div> <!-- .article-image-wrapper -->
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
  <header>
    <h2<?php print $title_attributes; ?>><?php print htmlspecialchars_decode($title); ?></h2>
  </header>
  <div class='byline'>
    <?php global $user;
    $formatted_date =  date('F d, Y',$node->field_curlitem_pub_date[$node->language][0]['value']);
     if((in_array('administrator',$user->roles)) or (in_array('administrator',$user->roles))) {
		print '<div class="edit-date">'.$formatted_date.'</div>';
  	  } else {
		print $formatted_date;  	  
  	  }
      if (!empty($node->field_curlitem_pub_byline[$node->language][0]['value'])) {
        print(" - ".$node->field_curlitem_pub_byline[$node->language][0]['value']);
      } 
    ?>
  </div> <!-- .byline -->
  <?php
  // this hack exists to allow editors and admins to edit the unix date    
  	global $user;
  	if(in_array('administrator',$user->roles)) {
  	}
  	?>

  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
  <?php endif; ?>
  <div<?php print $content_attributes; ?>>
     <?php print $node->body[$node->language][0]['value']; ?>
     <?php print htmlspecialchars_decode(render($content)); ?>
     <?php if (!empty($node->field_curlitem_pub_url[$node->language][0]['value'])): ?>
    <span class='read-more'>
       <a target='_blank' href='<?php print($node->field_curlitem_pub_url[$node->language][0]['value']); ?>'>
       <?php
       $linktext = $publication == 'Video' ? 'Watch Now<br/>' : 'Read Article';
       print $linktext;
       ?>
       </a>
    </span>
    <?php endif; ?>

  </div> <!-- content attributes -->

  <?php
  // probably a better way to do this...
    $topic_name = array();
    if (!empty($node->field_curlitem_topics[$node->language])) {
    foreach($node->field_curlitem_topics[$node->language] as $term) {
  		$topic_name[]="<a class='topic-link' id='topicTid-".(taxonomy_term_load($term['tid'])->tid)."' href='#'>".(taxonomy_term_load($term['tid'])->name)."</a>";
      }
        print "<div class='topics'>".implode($topic_name,', ')."</div>";
     }
  ?>
  <div class="clearfix"></div>

<?php if (!empty($node->field_curlitem_pub_url[$node->language][0]['value'])): ?>

  <div id='article-url'><?php print($node->field_curlitem_pub_url[$node->language][0]['value']); ?></div>
  <div class="social-links">
    <span class="sharetitle">Share This</span>
    <span class="facebook facebook-social"></span>
    <span class="twitter twitter-social"></span>
    <span class="gplus gplus-social"></span>
    <span class="linkedin linkedin-social"></span>
  </div>

 <?php endif; ?>
</article>
</div>