<?php
//** read vocab into array **//
function curlreader_vocab() {
  $page = array();
  $url = 'http://dev8.gsb.columbia.edu/articles/articles_services/';
  $vocabUrl = $url.'vocabulary/';
  $taxonomyUrl = $url.'taxonomy/';
  $xml = drupal_http_request($vocabUrl);
  $vocab_item =  json_decode($xml->data);
  $vocabMatrix = array();
  $termMatrix = array();
  	
  foreach($vocab_item as $key => $v) {
  	$voc = taxonomy_vocabulary_machine_name_load($v->machine_name);  	
  	if($voc) { //machine name exists... don't add new one
    $vocabMatrix[$v->vid]= $voc->vid;     
  		//do nothing  	   
  	} else { // add a new vocabulary item 
  	 return; // don't do this for now... 
  	  $voc = new stdClass;
  	  $voc->name = $v->name;
  	  $voc->machine_name = $v->machine_name;
  	  $voc->hierarchy = $v->hierarchy;
	  if(!empty($voc)){
  	      taxonomy_vocabulary_save($voc);
  	  }
      $vocabMatrix[$v->vid]= $voc->vid; 
  	}  	
	
  	}  	
	foreach($vocabMatrix as $origVid => $localVid) {
		$termMatrix[$localVid] = curlreader_build_taxonomy($taxonomyUrl, $localVid, $origVid);
	}
	return $termMatrix;
}


function  curlreader_build_taxonomy($url, $localVid, $origVid) {
  $url = $url.'?parameters[vid]='.$origVid;
  $voc = taxonomy_vocabulary_load($localVid);
  $tax_XML = drupal_http_request($url);
  $tax_items = json_decode($tax_XML->data);  
  $termMatrix = array();  
  foreach($tax_items as $key => $tax_item) { 
	$matching_terms = taxonomy_get_term_by_name($tax_item->name);
	if(empty($matching_terms)) {      
//       $term = new stdClass;
//       $term->vid = $voc->vid;
//       $term->name = $tax_item->name;
//       $term->vocabulary_machine_name = $voc->machine_name;
// 	  taxonomy_term_save($term);
// 	  $termMatrix[$tax_item->tid] = $term->tid;	
	} 
	else 
	{
       foreach($matching_terms as $key => $match) {
 	  	$termMatrix[$tax_item->tid] = $key;	
       }
	}
  }		
	return $termMatrix;
}

function  curlreader_taxonomy_purge($voc_machine_name) {
    return; // dont want to leave this open
  	$voc = taxonomy_vocabulary_machine_name_load($voc_machine_name);
  	if(!empty($voc)) {
  	  $terms = taxonomy_get_tree($voc->vid,0);
  	  foreach($terms as $term) {
  	    taxonomy_term_delete($term->tid);
  	      	  print('deleted');
  	  }
  	  print('done');
  	}
}