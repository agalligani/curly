<?php

function curlreader_ajaxpage() {
//print_r($_POST);
  global $base_path;

    if($_POST['landingpage'] == 'no') {
//       $order = array('featured.field_curlitem_featured_value' => 'DESC', 't.sticky' => 'DESC', 'pubdate.field_curlitem_pub_date_value' => 'DESC', 't.created' => 'DESC');
       $order = array('featured.field_curlitem_featured_value' => 'DESC', 'pubdate.field_curlitem_pub_date_value' => 'DESC', 't.created' => 'DESC');
  } else {
       $order = array('t.sticky' => 'DESC', 'pubdate.field_curlitem_pub_date_value' => 'DESC', 't.created' => 'DESC');
  }

  
  if(isset($_POST['trigger'])) { 
  if (empty($_POST['categories'])&&empty($_POST['topic'])) {
 	 // Invalid request.
      print(t('No category or topic selected.'));
    }  else {     
    
    if(isset($_POST['start'])) {
        $nomAry = array();
        $nomAry = isset($_POST['nomenclature']) ? $_POST['nomenclature'] : null;

      if(isset( $_POST['keys'] ) && !empty($_POST['keys'])) {
    	  $tids = curlreader_taxonomy_select_nodes($_POST['categories'], $_POST['topic'], $nomAry, $_POST['start'], $_POST['end'], $_POST['keys'], FALSE, FALSE, $order);
	    } else {
    	  $tids = curlreader_taxonomy_select_nodes($_POST['categories'], $_POST['topic'], $nomAry, $_POST['start'], $_POST['end'], null, FALSE, FALSE, $order);	    
	    }
	    if(count($tids) > 0) {
	  	  curlreader_ajaxpage_display($tids);
	  	  }
	  	}
  }
 } else {
   header('Location: '.$base_path);
 }
}

function curlreader_ajaxpage_display($nids=null) {
	$first_node = node_load($nids[0]);
	print(drupal_render(node_view_multiple(node_load_multiple($nids))));
	drupal_exit();
}

function curlreader_taxonomy_select_nodes($cats, $topic=null, $nomenclature=null, $start=null, $end=null, $searchKeys = null, $pager = FALSE, $limit = FALSE, $order = array('featured.field_curlitem_featured_value' => 'DESC','t.sticky' => 'DESC', 'pubdate.field_curlitem_pub_date_value' => 'DESC', 't.created' => 'DESC')) {


  if (!variable_get('taxonomy_maintain_index_table', TRUE)) {
    return array();
  }
    
  $query = db_select('taxonomy_index', 't');
  $query->addTag('node_access');
  if (is_array($cats)) {
    $query->condition('tid', $cats, 'IN');
  } else {
    $query->condition('tid', $cats, '=');  
  }
  if ($pager) {
    $count_query = clone $query;
    $count_query->addExpression('COUNT(t.nid)');
    $query = $query->extend('PagerDefault');
    if ($limit !== FALSE) {
      $query = $query->limit($limit);
    }
    $query->setCountQuery($count_query);
  }
  else {
    if ($limit !== FALSE) {
      $query->range(0, $limit);
    }
  }
  
  if(($start !== null)&&($end !== null)) {
      $query->range($start, $end);  
  }
  
  if($topic) {
     $topicNids = topicQuery($topic);
     $query->condition('nid', $topicNids, 'IN');
  }

  if($nomenclature) {
     $nomNids = nomQuery($nomenclature);
     $query->condition('nid', $nomNids, 'IN');
  }
  
  
  $query->addField('t', 'nid');
  $query->addField('t', 'tid');
  $query->leftJoin('field_data_field_curlitem_pub_date', 'pubdate', 'pubdate.entity_id = t.nid');
  $query->leftJoin('field_data_field_curlitem_featured', 'featured', 'featured.entity_id = t.nid');
  $query->addField('pubdate','field_curlitem_pub_date_value');

//* search
  if (isset($searchKeys)) { 
    $snids = curlreader_adhocsearch($searchKeys);
    $query->condition('nid', $snids, 'IN');
  }

  foreach ($order as $field => $direction) {
    $query->orderBy($field, $direction);
    list($table_alias, $name) = explode('.', $field);
    $query->addField($table_alias, $name);
  }
  return $query->execute()->fetchCol();
}

function topicQuery($t) {
	$topicQuery = db_select('taxonomy_index','ti');
	$topicQuery->condition('tid', $t, '=');
    $topicQuery->addTag('node_access');
	$topicQuery->addField('ti','nid');
    return $topicQuery->execute()->fetchCol();	  
}

function nomQuery($t) {
	$nomQuery = db_select('taxonomy_index','ti');
	if (is_array($t)) {
      $nomQuery->condition('tid', $t, 'IN');
    } else {
      $nomQuery->condition('tid', $t, '=');  
    }
    $nomQuery->addTag('node_access');
	$nomQuery->addField('ti','nid');
    return $nomQuery->execute()->fetchCol();	  
}


function curlreader_ajaxSetDate() {
  if(isset($_POST['nid'])) {
   	$nid = $_POST['nid'];
    $node = node_load($nid);
    $newDate = strtotime($_POST['dateValue']);
    if($newDate) {
      $node->field_curlitem_pub_date[$node->language][0]['value'] = $newDate;
      node_save($node);
      print("New Date Saved");
    } else {
      print("Date Not Saved");
    }
  }
}

