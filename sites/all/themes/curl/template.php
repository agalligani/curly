<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function curl_preprocess_node(&$vars, $hook) {
  // add a class to identify the taxonomy term(s) for the specified node types and taxonomies
  // SET type - specify the node types this class is needed for.
  if (isset($vars['field_curlitem_featured']['und'][0]['value'])) {
  if ($vars['field_curlitem_featured']['und'][0]['value']==1) {
       $vars['attributes_array']['class'][] = 'featured-article';
     }
  }
}

function curl_css_alter(&$css) {
    // move base.css last
    $keys = preg_grep('/sites\/all\/modules\/meganav\/assets\/css\/base\.css/', array_keys($css));
    foreach($keys as $key){
        $css[$key]['group'] = 3000;
    }
}