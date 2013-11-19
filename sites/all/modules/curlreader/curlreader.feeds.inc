<?php

function curlreader_correct_prefix() {

  $article_parent = 'Chazen Global Insights';
  $prefix = 'chazen';
  curlreader_fix_prefix($article_parent,$prefix); 
  
  $article_parent = 'Caseworks';
  $prefix = 'caseworks';
  curlreader_fix_prefix($article_parent,$prefix); 

  $article_parent = 'Newsroom';
  $prefix = 'newsroom';
  curlreader_fix_prefix($article_parent,$prefix); 

  $article_parent = 'Columbia Business';
  $prefix = 'CBS';
  curlreader_fix_prefix($article_parent,$prefix); 

  $article_parent = 'Ideas at Work';
  $prefix = 'CBS';
  curlreader_fix_prefix($article_parent,$prefix); 

  $article_parent = 'Video';
  $prefix = 'video';
  curlreader_fix_prefix($article_parent,$prefix); 

}

function curlreader_fix_prefix($article_parent, $correct_prefix) {
	$category = taxonomy_get_term_by_name($article_parent,'articles',1);
	
  	foreach($category as $key => $cat_term) {
      $catTid = $cat_term->tid;
  	}

	$pubnids = db_query('	
	SELECT n.nid
    FROM  field_data_field_curlitem_category_parent cp
    JOIN node n ON cp.entity_id = n.nid
    JOIN field_data_field_curlitem_pub_nid pn ON cp.entity_id = pn.entity_id
    WHERE cp.field_curlitem_category_parent_tid = :tid
    ORDER BY pn.field_curlitem_pub_nid_value, n.status DESC', array(':tid' => $catTid));

 	$result = $pubnids->fetchAll();
	$pubnidsAry = array();
	
	foreach($result as $article) {
		
		$pubnidsAry[] = $article->nid;
	
	}
 	
	$nodes = node_load_multiple($pubnidsAry);
	$previous_pub_nid  = '';
	
	foreach($nodes as $node) {
	
	  if($previous_pub_nid  == 	$node->field_curlitem_pub_nid[$node->language][0]['value']) {
	    node_delete($node->nid);
	  } else {
	  	  $previous_pub_nid  = 	$node->field_curlitem_pub_nid[$node->language][0]['value'];
	  	  
	    if($node->field_curlitem_pub_prefix[$node->language][0]['value']!=$correct_prefix) {
	       $node->field_curlitem_pub_prefix[$node->language][0]['value']=$correct_prefix;
	       node_save($node);  
	  }
	  }
	  
	  
	  print $node->status.' - '.$node->title.'->'.$node->field_curlitem_pub_prefix[$node->language][0]['value'].'<br>';


	}
}

function curlreader_show_prefix($article_parent) {
	$category = taxonomy_get_term_by_name($article_parent,'articles',1);
	
  	foreach($category as $key => $cat_term) {
      $catTid = $cat_term->tid;
  	}
  	
  $catTid = 'curlitem';
   	$nidsByPub = db_query(
  	'SELECT n.nid 
  	FROM node n 
  	WHERE n.type = :tid
  	ORDER BY n.title', array(':tid' => $catTid));

	$result = $nidsByPub->fetchAll();
	$pubnids = array();
	
	foreach($result as $article) {
		
		$pubnids[] = $article->nid;
	
	}
	
	$nodes = node_load_multiple($pubnids);
	
	foreach($nodes as $node) {
			  
	  print '<a href=\'node/'.$node->nid.'/edit/\'>'.$node->status.' - '.$node->title.'</a>->'.$node->field_curlitem_pub_prefix[$node->language][0]['value'].'<br>';

	}
	
}



function curlreader_permission() {
  return array(
    'Run curl feeds' => array(
      'title' => t('Run curl feeds'),
      'description' => t('Run curl feeds')
    ),
  );
}


function curlreader_cron($tid = NULL) {

curlreader_page_cbs();
curlreader_page_newsroom();
curlreader_page_chazen();
curlreader_page_caseworks();
curlreader_loadvideo();

}

function curlreader_page_cbs() {
  $page = curlreader_page('cbs', null, 5000);
  return $page; 
}

function curlreader_page_newsroom() {
  $page = curlreader_page('newsroom', 4, 50, 8);
   // School News  tid = 4
   // Press Relese tid = 31
  return $page; 
}

function curlreader_page_chazen() {
  $page = curlreader_page('chazen', null, 3000);	
	return $page;
}


function curlreader_page_caseworks() {
  $page = curlreader_page('caseworks', null, 3000);	
	return $page;
}

function curlreader_page($source, $tid = NULL, $xitems = NULL, $feedpage = NULL) {

if($tid) {
 	$option['query']['tid'] = $tid;
 }


if($xitems) {
 	$option['query']['xitems'] = $xitems;
 }


if($feedpage) {
 	$option['query']['page'] = $feedpage;
 }
 
  $base_url = '';
  	
  switch ($source) {
    case 'cbs':
      $base_url = variable_get('url_cbs', 'http://www8.gsb.columbia.edu/articles/articles_services/search/article');
      break;
    case 'newsroom':
      $base_url = variable_get('url_newsroom', 'http://www8.gsb.columbia.edu/news/articles_services/search');
      break;
    case 'chazen':
      $base_url = variable_get('url_chazen', 'http://www8.gsb.columbia.edu/chazen/globalinsights/articles_services/search/article');
      break;
    case 'caseworks':
      $base_url = variable_get('url_caseworks', '');
      break;
   }	
	
	$url = url($base_url, $option);
// 	drupal_set_message($url);
	curlreader_publication_loop_results($url, $source);
	
    $page = array();
	
	$page['heading'] = array(
	  '#type' => 'markup',
	  '#markup' => 'loading articles',
	);
	
	return $page;
}

function curlreader_publication_loop_results($url = NULL, $source = NULL) {
    if($source == 'cbs') {
        	$pub_prefix = 'CBS';

    } else {
    	$pub_prefix = $source;
    	}
	$data = drupal_http_request($url);
	if (empty($data)) {
	$message = $source.' feed not processed....';
	watchdog('curlreader', '%source feed %url not processed.',array('%url'=>$url,'%source' => $source), WATCHDOG_WARNING);
	  return;
    }
    if(isset($data->data)) {
	  $publication_item = json_decode($data->data);
	} else {
	  drupal_set_message('data not loaded');
	  	watchdog('curlreader', '%source feed %url - data not loaded.',array('%url'=>$url,'%source' => $source), WATCHDOG_WARNING);
	  return;
	}
	if (isset($data->error) && !empty($data->error)) {
	  return drupal_set_message($data->error);
	}
	elseif (isset($publication_item->content) && !empty($publication_item->content)) {
	  curlreader_process_content($publication_item, $pub_prefix);
	}
	else {
		return drupal_set_message(t('Cannot get data.'));
	}
		drupal_set_message('Process complete');
}

function curlreader_process_content(&$publication_items, $pub_prefix) {


  $count = 0;
// need to derive publication from url
  $publication = $pub_prefix;
  $pre_existing_nids = curlreader_get_pub_matches($pub_prefix);  
  foreach ($publication_items->content as $article) {
  	$img = !empty($article->image->url) ? $article->image->url : '';  	
  	$img_w = !empty($article->image->detail[0]->width) ? $article->image->detail[0]->width : 0;
  	$img_h = !empty($article->image->detail[0]->height) ? $article->image->detail[0]->height : 0;
  	if(!in_array($article->nid, $pre_existing_nids)) {
      $node = new stdClass();
      $node->language = LANGUAGE_NONE;
      $node->type = 'curlitem';
      $node->status = 0;
	  $node->uid = 1;
      $node->title = $article->title;
      $node->body[$node->language][0]['summary'] = $article->body_summary;
      $node->body[$node->language][0]['value'] = $article->body_summary;
      $node->field_curlitem_pub_img_url[$node->language][0]['value'] = $img;
      $node->field_curlitem_pub_img_w[$node->language][0]['value'] = $img_w;
      $node->field_curlitem_pub_img_h[$node->language][0]['value'] = $img_h;
      $node->field_curlitem_pub_date[$node->language][0]['value'] = 
      $article->created;

      $node->field_curlitem_pub[$node->language][0]['value'] = $publication;
      $node->field_curlitem_pub_prefix[$node->language][0]['value'] = $pub_prefix;
      $node->field_curlitem_pub_nid[$node->language][0]['value'] = $article->nid;
      $node->field_curlitem_pub_url[$node->language][0]['value'] = url($article->path->url);
      $node->promote = 1;
      $node->created = time();
      $node->timestamp = time();
      $node->field_curlitem_featured[$node->language][0]['value'] = 0;
      $node->sticky = 0;
      $node->format = 3;
      $node->revision = 0; 
      
    // set category value  
      $localVid = taxonomy_vocabulary_machine_name_load('articles')->vid;
        $catTerm = taxonomy_get_term_by_name($article->catorgy->name);
        reset($catTerm);
        $node->field_curlitem_category[$node->language][0]['tid'] = isset($catTerm) ? key($catTerm) : NULL;

    // set category parent - may not need to be stored      
	//$parent_tid = !empty($node->field_curlitem_category[$node->language][0]['tid']) ? array_shift(array_values(taxonomy_term_load($node->field_curlitem_category[$node->language][0]['tid'])->parent)):null;
    $parents = array_keys(taxonomy_get_parents($node->field_curlitem_category[$node->language][0]['tid']));				
    $node->field_curlitem_category_parent[$node->language][0]['tid'] = empty($parents[0]) ? NULL : $parents[0];
	
    // set topics
    if(!empty($article->topics)) {
      $topic_count = 0;
     	foreach($article->topics as $topic) {	
     	 $topicTerm = taxonomy_get_term_by_name($topic->name);
         reset($topicTerm);
         $node->field_curlitem_topics[$node->language][$topic_count]['tid'] = isset($topicTerm) ? key($topicTerm) : NULL;
   	     $topic_count = $topic_count+1;
   		}
  	  }
   		
   	 if(($node->field_curlitem_category[$node->language][0]['tid']) && ($node->field_curlitem_category_parent[$node->language][0]['tid'])) {
      	node_save($node);
        drupal_set_message('Pub article #'.$article->nid.': "'.$article->title.'" processed.');    
       } else {
             drupal_set_message('Pub article #'.$article->nid.' "'.$article->title.'" not processed. Taxonomy '.$article->catorgy->tid.' '.$article->catorgy->name);          
       }
//      return;
      }
}


}

function curlreader_get_pub_matches($pub_prefix) {

	$pubnids = db_query('
	
	SELECT f.field_curlitem_pub_nid_value
    FROM  field_data_field_curlitem_pub_prefix pp
      INNER JOIN node n ON pp.entity_id = n.nid
      INNER JOIN field_data_field_curlitem_pub_nid f ON pp.entity_id = f.entity_id
      WHERE pp.field_curlitem_pub_prefix_value = :pub', array(':pub'=> $pub_prefix));
      
	$result = $pubnids->fetchAll();
	$pubnids = array();
	
	foreach($result as $article) {
		
		$pubnids[] = $article->field_curlitem_pub_nid_value;
	
	}
	return $pubnids;
}

function show_dupes() {


  $dupes_page = array();

  $dupes_page['title'] = array(
    '#type' => 'markup',
    '#markup' => 'test',
  );
  
//         '#article_parents' => curlreader_get_terms('articles',1),

  
  $query = new EntityFieldQuery();
   $result = $query->entityCondition('entity_type', 'node')
  ->propertyCondition('type','curlitem')
  ->propertyCondition('status', 0)
  ->fieldOrderBy('field_curlitem_pub_nid', 'value', 'ASC')
  ->range(0,100)
  ->execute(); 

$curl_items = array();


  if($result) {  
     $curl_items = node_load_multiple(array_keys($result['node']));
   }  
  foreach($curl_items as $curl_item) {
  
    $dupes_page[$curl_item->nid] = array(
    '#type' => 'markup',
    '#markup' => $curl_item->title,
    '#prefix' => '<li>',
    '#suffix' => '</li>',    
  );
  }
  return $dupes_page;
}

function show_dupes_source($article_parent) {

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
