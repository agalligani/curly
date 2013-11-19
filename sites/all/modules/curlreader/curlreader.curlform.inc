<?php


/*
 * Implements hook_block_info
 */
function curlreader_block_info() {
   $blocks = array();
     $blocks['curlform'] = array('info' => t('Curl Selector Form'),);
     $blocks['curlform_CBS'] = array('info' => t('CBS Selector Form'),);     
     $blocks['curlform_chazen'] = array('info' => t('Chazen Selector Form'),);
     $blocks['curlform_ideas'] = array('info' => t('Ideas Selector Form'),);
     $blocks['curlform_newsroom'] = array('info' => t('Newsroom Selector Form'),);
     $blocks['curlform_video'] = array('info' => t('Video Selector Form'),);
     $blocks['curlform_mobile'] = array('info' => t('Mobile Block Placeholder'),);
   return $blocks;
}

/*
 * Implements hook_block_view
 */
function curlreader_block_view($delta = '') {
  $blocks = array();
  switch($delta) {
  case 'curlform':
    $blocks['content'] = array(
      '#theme' => 'curlmenu',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
    );
  break;
  case 'curlform_chazen':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_chazen',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
      '#nomenclature' =>  curlreader_get_matching_noms("Chazen Global Insights"),
    );
  break;
  case 'curlform_CBS':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_cbs',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
      '#nomenclature' =>  curlreader_get_matching_noms("Columbia Business"),
    );
  break;
  case 'curlform_ideas':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_ideas',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
      '#nomenclature' =>  curlreader_get_matching_noms("Ideas at Work"),
    );
  break;
  case 'curlform_newsroom':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_newsroom',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
      '#nomenclature' =>  curlreader_get_matching_noms("Newsroom"),
    );
  break;
  case 'curlform_video':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_video',
      '#article_parents' => curlreader_get_terms('articles',1),
      '#articles' => curlreader_get_terms('articles'),
      '#topics' => curlreader_get_terms('topics'),
      '#nomenclature' =>  array(),
      '#categories' =>  curlreader_get_child_cats("Video"),
    );
  break;
    case 'curlform_mobile':
    $blocks['content'] = array(
      '#theme' => 'curlmenu_mobile',
      '#var' => 'curlmenu_mobile',
    );
  break;

  }
  return $blocks;
}

/*
 * Implements hook_block_theme
 */
function curlreader_theme($existing, $type, $theme, $path) {
  return array(
      'curlmenu' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL),
          'template' => 'templates/curlmenu',
          ),
      'curlmenu_cbs' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL, 'nomenclature' => NULL),
          'template' => 'templates/curlmenu_cbs',
          ),
      'curlmenu_chazen' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL, 'nomenclature' => NULL),
          'template' => 'templates/curlmenu_chazen',
          ),
      'curlmenu_ideas' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL, 'nomenclature' => NULL),
          'template' => 'templates/curlmenu_ideas',
          ),
      'curlmenu_newsroom' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL, 'nomenclature' => NULL),
          'template' => 'templates/curlmenu_newsroom',
          ),
      'curlmenu_video' => array(
          'variables' => array('articles' => NULL,'article_parents' => NULL, 'topics' => NULL, 'nomenclature' => NULL, 'categories' => NULL ),
          'template' => 'templates/curlmenu_video',
          ),
      'curlmenu_mobile' => array(
          'variables' => array('var' => NULL),
          'template' => 'templates/curlmenu_mobile',
          ),
      );
}

function curlreader_get_terms($vid_machine_name, $depth=null) {
  $tids = array();	
    if ($vocabulary = taxonomy_vocabulary_machine_name_load($vid_machine_name)) {
      if ($terms = taxonomy_get_tree($vocabulary->vid, 0, $depth)) {
        foreach ($terms as $term) {
			$tids[$term->tid] = $term->name; 
      }
    }      
  }
 return $tids;
}

/*
 * Retrieve only nomenclature assoc'd with this article type for check box filters.
 */
 
function curlreader_get_matching_noms($article_parent) {

  $category = taxonomy_get_term_by_name($article_parent,'articles',1);
  foreach($category as $key => $cat_term) {
      $catTid = $cat_term->tid;
  }
  
  $catChildren = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load('articles')->vid,$catTid);
  $catChildrenTids = array();
  
  foreach($catChildren as $catChild) {
    $catChildrenTids[] = $catChild->tid;
  }
  
  /* select the category nids */
  
  $catQuery = db_select('taxonomy_index','ti');
  $catQuery->condition('tid', $catChildrenTids, 'IN');
  $catQuery->addTag('node_access');
  $catQuery->addField('ti','nid');
  $catResults = $catQuery->execute()->fetchCol();	    

  /*extract all tids assoc'd with those nids */
  
  $tidQuery = db_select('taxonomy_index','ti');
  $tidQuery->condition('nid', $catResults, 'IN');
  $tidQuery->addTag('node_access');
  $tidQuery->addField('ti','tid');
  $tidQuery->groupBy('ti.tid');
  $tidResults = $tidQuery->execute()->fetchCol();	  


  $nomTids = curlreader_get_terms('nomenclature');
  $availableNoms = array();
    
  foreach($nomTids as $nomTid => $value) {
     if(in_array($nomTid, $tidResults)) {
       $availableNoms[$nomTid] = $value; 
     }
  }
  return $availableNoms;
}


function curlreader_get_child_cats($article_parent) {

  $category = taxonomy_get_term_by_name($article_parent,'articles',1);
  foreach($category as $key => $cat_term) {
      $catTid = $cat_term->tid;
  }
  
  $catChildren = taxonomy_get_tree(taxonomy_vocabulary_machine_name_load('articles')->vid,$catTid);
  $catChildrenArray = array();
  
  foreach($catChildren as $catChild) {
    $catChildrenArray[$catChild->tid] = $catChild->name;
  }
  
  return $catChildrenArray;
}