<?php
 
function curlreader_admin() {
  $form = array();
  
          
   $form['curl_settings_markup1'] = array(
    '#type' => 'markup',
    '#markup' => t('<h2>Feeds Section</h2>')
   );
       

  $form['url_cbs'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for CBS Feed'),
    '#default_value' => variable_get('url_cbs', 'http://www8.gsb.columbia.edu/articles/articles_services/search/article'),
    '#size' => 90,
    '#maxlength' => 90,
    '#description' => t("Default Value: http://www8.gsb.columbia.edu/articles/articles_services/search/article"),
    '#required' => TRUE,
  );
    
  $form['url_chazen'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for Chazen Feed'),
    '#default_value' => variable_get('url_chazen', 'http://www8.gsb.columbia.edu/chazen/globalinsights/articles_services/search/article'),
    '#size' => 90,
    '#maxlength' => 90,
    '#description' => t("Default Value: http://www8.gsb.columbia.edu/chazen/globalinsights/articles_services/search/article"),
    '#required' => TRUE,
  );
    
//   $form['url_ideas'] = array(
//     '#type' => 'textfield',
//     '#title' => t('URL for Ideas at Work Feed'),
//     '#default_value' => variable_get('url_ideas', 'http://www8.gsb.columbia.edu/caseworks/articles_services/search/article'),
//     '#size' => 90,
//     '#maxlength' => 90,
//     '#description' => t("Default Value: http://www8.gsb.columbia.edu/caseworks/articles_services/search/article"),
//     '#required' => TRUE,
//   );
        
  $form['url_caseworks'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for Caseworks Feed'),
    '#default_value' => variable_get('url_caseworks', 'http://www8.gsb.columbia.edu/caseworks/articles_services/search/article'),
    '#size' => 90,
    '#maxlength' => 90,
    '#description' => t("Default Value: http://www8.gsb.columbia.edu/caseworks/articles_services/search/article"),
    '#required' => TRUE,
  );
        
  $form['url_newsroom'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for Newsroom Feed'),
    '#default_value' => variable_get('url_newsroom', 'http://www8.gsb.columbia.edu/news/articles_services/search'),
    '#size' => 90,
    '#maxlength' => 90,
    '#description' => t("Default Value: http://www8.gsb.columbia.edu/news/articles_services/search"),
    '#required' => TRUE,
  );
        
  $form['url_video'] = array(
    '#type' => 'textfield',
    '#title' => t('URL for Video Feed'),
    '#default_value' => variable_get('url_video', 'http://www7.gsb.columbia.edu/video/feed'),
    '#size' => 90,
    '#maxlength' => 90,
    '#description' => t("Default Value: http://www7.gsb.columbia.edu/video/feed"),
    '#required' => TRUE,
  );
  
  return system_settings_form($form);

}

function curlreader_images_form($form, &$form_state) {
  $form = array();
        
   $form['curl_settings_markup2'] = array(
    '#type' => 'markup',
    '#markup' => t('<h2>Images Section</h2>')
   );
       

  $form['curl_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('')
   );


  $form['curl_settings']['curl_image'] = array(
    '#title' => t('Curl background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('curl_image'),
    '#upload_location' => 'public://',
    );


  $form['curl_settings']['curl_logo'] = array(
    '#title' => t('Curl logo.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('curl_logo'),
    '#upload_location' => 'public://',
    );
    
  $form['curl_settings']['columbia_business_image'] = array(
    '#title' => t('Columbia Business background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('columbia_business_image'),
    '#upload_location' => 'public://',
    );
        
  $form['curl_settings']['columbia_business_logo'] = array(
    '#title' => t('Columbia Business logo.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('columbia_business_logo'),
    '#upload_location' => 'public://',
    );
        
  $form['curl_settings']['chazen_image'] = array(
    '#title' => t('Chazen background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('chazen_image'),
    '#upload_location' => 'public://',
    );

  $form['curl_settings']['chazen_logo'] = array(
    '#title' => t('Chazen logo image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('chazen_logo'),
    '#upload_location' => 'public://',
    );
    
  $form['curl_settings']['ideas_at_work_image'] = array(
    '#title' => t('Ideas at Work background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('ideas_at_work_image'),
    '#upload_location' => 'public://',
  );

  $form['curl_settings']['ideas_at_work_logo'] = array(
    '#title' => t('Ideas at Work logo.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('ideas_at_work_logo'),
    '#upload_location' => 'public://',
  );

  $form['curl_settings']['newsroom_image'] = array(
    '#title' => t('Newsroom background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('newsroom_image'),
    '#upload_location' => 'public://',
  );
  
  $form['curl_settings']['newsroom_logo'] = array(
    '#title' => t('Newsroom logo.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('newsroom_logo'),
    '#upload_location' => 'public://',
  );
//   
//   $form['curl_settings']['caseworks_image'] = array(
//     '#title' => t('Caseworks background image.'),
//     '#type' => 'managed_file',
//     '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
//     '#default_value' => variable_get('caseworks_image'),
//     '#upload_location' => 'public://',
//   );
//   
  $form['curl_settings']['video_image'] = array(
    '#title' => t('Video background image.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('video_image'),
    '#upload_location' => 'public://',
  );
  
  $form['curl_settings']['video_logo'] = array(
    '#title' => t('Video logo.'),
    '#type' => 'managed_file',
    '#description' => t('<strong>WARNING: UPLOADING A NEW IMAGE WILL DELETE THE OLD ONE FROM THE SYSTEM.</strong>'),
    '#default_value' => variable_get('video_logo'),
    '#upload_location' => 'public://',
  );
  
//  drupal_set_message(print_r($form['curl_settings'],true));
  //We need to do the following because with managed_file we cant add in additional submit handler like the one below.
  //$form['#submit'][]='gsb_theme_save';
//   if (isset($form_state['values']['chazen_image']) && is_numeric($form_state['values']['chazen_image']) && $form_state['values']['chazen_image'] > 0) {
//     //Let delete the old image
//     if (variable_get('chazen_image') > 0) {
//       $file = file_load(variable_get('chazen_image')); 
//       if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Chazen image deleted.'));       
//       }
//     }
//     //Saving the new image
//     $file = file_load($form_state['values']['chazen_image']);
//     if ($file) {
//       $file->status = FILE_STATUS_PERMANENT;
//       file_save($file);
//       file_usage_add($file, 'user', 'user', 1);
//       drupal_set_message(t('New chazen image saved.'));
//     }
//     unset($file);
//   }




//   $form['curl_cat'] = array(
//     '#type' => 'checkboxes',
//     '#title' => t('Select Curl Category'),
//     '#default_value' => variable_get('curl_cat', 0),
//     '#multiple' => TRUE,
//     '#options' => $cat_options,
//   );
// 
 $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Images Permanently'),
  );
//  return system_settings_form($form);
  return $form;

}

// validation function for admin form

function curl_admin_validate($form, &$form_state) {
}

// submit function for admin form

function curlreader_images_form_submit($form, &$form_state) {

   if (isset($form_state['values']['curl_image']) && is_numeric($form_state['values']['curl_image']) && $form_state['values']['curl_image'] > 0) {
    //Let delete the old image
    if (variable_get('curl_image') > 0) {
      $file = file_load(variable_get('curl_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Curl image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['curl_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
              variable_set('curl_image',$file->fid);   

      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New curl image saved.'));
      }
      unset($file);
    }
 
 
   if (isset($form_state['curl_logo']) && is_numeric($form_state['values']['curl_logo']) && $form_state['values']['curl_logo'] > 0) {
    //Let delete the old logo
    if (variable_get('curl_logo') > 0) {
      $file = file_load(variable_get('curl_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Curl logo deleted.'));       
      }
    }
    //Saving the new logo
    $file = file_load($form_state['values']['curl_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      variable_set('curl_logo',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New curl logo saved.'));
      }
      unset($file);
    }
 
    
   if (isset($form_state['values']['columbia_business_image']) && is_numeric($form_state['values']['columbia_business_image']) && $form_state['values']['columbia_business_image'] > 0) {
    //Let delete the old image
    if (variable_get('columbia_business_image') > 0) {
      $file = file_load(variable_get('columbia_business_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Columbia Business image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['columbia_business_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      variable_set('columbia_business_image',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Columbia Business image saved.'));
      }
      unset($file);
    }
    
   if (isset($form_state['values']['columbia_business_logo']) && is_numeric($form_state['values']['columbia_business_logo']) && $form_state['values']['columbia_business_logo'] > 0) {
    //Let delete the old logo
    if (variable_get('columbia_business_logo') > 0) {
      $file = file_load(variable_get('columbia_business_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Columbia Business logo deleted.'));       
      }
    }
    //Saving the new logo
    $file = file_load($form_state['values']['columbia_business_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      variable_set('columbia_business_logo',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Columbia Business logo saved.'));
      }
      unset($file);
    }

   if (isset($form_state['values']['chazen_image']) && is_numeric($form_state['values']['chazen_image']) && $form_state['values']['chazen_image'] > 0) {
    //Let delete the old image
    if (variable_get('chazen_image') > 0) {
      $file = file_load(variable_get('chazen_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Chazen image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['chazen_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
            variable_set('chazen_image',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New chazen image saved.'));
      }
      unset($file);
    }


   if (isset($form_state['values']['chazen_logo']) && is_numeric($form_state['values']['chazen_logo']) && $form_state['values']['chazen_logo'] > 0) {
    //Let delete the old image
    if (variable_get('chazen_logo') > 0) {
      $file = file_load(variable_get('chazen_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Chazen image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['chazen_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      variable_set('chazen_logo',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New chazen logo saved.'));
      }
      unset($file);
    }


   if (isset($form_state['values']['ideas_at_work_image']) && is_numeric($form_state['values']['ideas_at_work_image']) && $form_state['values']['ideas_at_work_image'] > 0) {
    //Let delete the old image
    if (variable_get('ideas_at_work_image') > 0) {
      $file = file_load(variable_get('ideas_at_work_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Ideas at Work image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['ideas_at_work_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
                  variable_set('ideas_at_work_image',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New ideas at work image saved.'));
      }
      unset($file);
    }
    

   if (isset($form_state['values']['ideas_at_work_logo']) && is_numeric($form_state['values']['ideas_at_work_logo']) && $form_state['values']['ideas_at_work_logo'] > 0) {
    //Let delete the old logo
    if (variable_get('ideas_at_work_logo') > 0) {
      $file = file_load(variable_get('ideas_at_work_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Ideas at Work logo deleted.'));       
      }
    }
    //Saving the new logo
    $file = file_load($form_state['values']['ideas_at_work_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
      file_usage_add($file, 'user', 'user', 1);
                        variable_set('ideas_at_work_logo',$file->fid);

      drupal_set_message(t('New ideas at work logo saved.'));
      }
      unset($file);
    }
    
        
   if (isset($form_state['values']['newsroom_image']) && is_numeric($form_state['values']['newsroom_image']) && $form_state['values']['newsroom_image'] > 0) {
    //Let delete the old image
    if (variable_get('newsroom_image') > 0) {
      $file = file_load(variable_get('newsroom_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Newsroom image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['newsroom_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
                        variable_set('newsroom_image',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Newsroom image saved.'));
      }
      unset($file);
    }

  
        
   if (isset($form_state['values']['newsroom_logo']) && is_numeric($form_state['values']['newsroom_logo']) && $form_state['values']['newsroom_logo'] > 0) {
    //Let delete the old logo
    if (variable_get('newsroom_logo') > 0) {
      $file = file_load(variable_get('newsroom_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Newsroom logo deleted.'));       
      }
    }
    //Saving the new logo
    $file = file_load($form_state['values']['newsroom_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
                        variable_set('newsroom_logo',$file->fid);
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Newsroom logo saved.'));
      }
      unset($file);
    }

        
   if (isset($form_state['values']['video_image']) && is_numeric($form_state['values']['video_image']) && $form_state['values']['video_image'] > 0) {
    //Delete the old image
    if (variable_get('video_image') > 0) {
      $file = file_load(variable_get('video_image')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Video image deleted.'));       
      }
    }
    //Saving the new image
    $file = file_load($form_state['values']['video_image']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
        variable_set('video_image',$file->fid);   
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Video image saved.'));
      }
      unset($file);
    }

   if (isset($form_state['values']['video_logo']) && is_numeric($form_state['values']['video_logo']) && $form_state['values']['video_logo'] > 0) {
    //Let delete the old logo
    if (variable_get('video_logo') > 0) {
      $file = file_load(variable_get('video_logo')); 
      if ($file->fid) {
//         file_delete($file, TRUE);
//         drupal_set_message(t('Old Video logo deleted.'));       
      }
    }
    //Saving the new logo
    $file = file_load($form_state['values']['video_logo']);
    if ($file) {
      $file->status = FILE_STATUS_PERMANENT;
      file_save($file);
              variable_set('video_logo',$file->fid);   
      file_usage_add($file, 'user', 'user', 1);
      drupal_set_message(t('New Video logo saved.'));
      }
      unset($file);
    }


 drupal_set_message(t('The settings have been saved'));
 
}

