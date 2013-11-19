<?php

function curlreader_loadvideo() {
    $vidPage = array();
    	
    $feedUrl = variable_get('url_video','http://www7.gsb.columbia.edu/video/feed');
    $feedUrl = 'http://www7.gsb.columbia.edu/video/feed';
    
    drupal_set_message($feedUrl);

    $rawfeed = file_get_contents($feedUrl);
    $xml = new SimpleXmlElement($rawfeed);
    
      $channel = array();
      $channel['title'] = $xml->channel->title;
      $channel['link'] = $xml->channel->link;
      $channel['description'] = $xml->channel->description;
      $pre_existing_nids = curlreader_get_pub_matches('video');  
	    
    foreach ($xml->channel->item as $item) {
    
      $url_array = explode('/',$item->link);
      $video_nid = end($url_array);
   // check if nid exists

  	if(!in_array($video_nid, $pre_existing_nids)) {
  	
      $node = new stdClass();
      $node->language = LANGUAGE_NONE;
      $node->type = 'curlitem';
      $node->status = 0;
	  $node->uid = 1;
      $node->title = $item->title;
      $node->body[$node->language][0]['summary'] = $item->description;
      $node->body[$node->language][0]['value'] = $item->description;
      $node->field_curlitem_pub_img_url[$node->language][0]['value'] = '/'.drupal_get_path('theme','curl').'/images/movie_file.png';
      $node->field_curlitem_pub_img_w[$node->language][0]['value'] = 128;
      $node->field_curlitem_pub_img_h[$node->language][0]['value'] = 128;
      $node->field_curlitem_pub_date[$node->language][0]['value'] = strtotime($item->pubDate);
      $node->field_curlitem_pub[$node->language][0]['value'] = 'video';
      $node->field_curlitem_pub_prefix[$node->language][0]['value'] = 'video';
      $node->field_curlitem_pub_nid[$node->language][0]['value'] = $video_nid;
      $node->field_curlitem_pub_url[$node->language][0]['value'] = url($item->link); 
      $node->promote = 1;
      $node->created = time();
      $node->timestamp = time();
      $node->field_curlitem_featured[$node->language][0]['value'] = 0;
      $node->sticky = 0;
      $node->format = 3;
      $node->revision = 0;

    // set category value  
      $localVid = taxonomy_vocabulary_machine_name_load('articles')->vid;
      $catTerm = taxonomy_get_term_by_name('Video');
      $node->field_curlitem_category[$node->language][0]['tid'] = isset($catTerm) ? key($catTerm) : NULL;
      $node->field_curlitem_category_parent[$node->language][0]['tid'] = isset($catTerm) ? key($catTerm) : NULL;
      
   	  node_save($node);
        drupal_set_message('Pub video:'.$item->title.' processed.');    
  }    
}
    return $vidPage;
}