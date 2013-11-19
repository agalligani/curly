<?php
function curlreader_adhocsearch($searchKeys) {
  $query = db_select('search_index', 'i', array('target'=>'slave'))
      ->extend('SearchQuery');
  $query->join('node', 'n', 'n.nid = i.sid');
  $keys = is_array(explode(' ',$searchKeys)) ? implode(' OR ',(explode(' ',$searchKeys))) : $searchKeys;
//   drupal_set_message($keys);
  $query 
    ->condition('n.status', 1)
    ->addTag('node_access')
    ->searchExpression($keys, 'node');
  if(!$query->executeFirstPass()) {
    return array();
  }
  $nids = array();
  $find = $query->execute();
  foreach ($find as $item) {
    $nids[] = $item->sid;
  }
  return $nids;
}