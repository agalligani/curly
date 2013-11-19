<?php print $doctype; ?>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"<?php print $rdf->version . $rdf->namespaces; ?>>
<head<?php print $rdf->profile; ?>>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
   <script src="/<?php print drupal_get_path('theme','curl').'/js/modernizr-2.6.2.min.js'; ?>"></script>
  <?php print $scripts; ?>
  <!-- style type="text/css" media="all">@import url("http://stage8.gsb.columbia.edu/curl/sites/all/themes/gsb_theme/assets/css/base.css");</style -->
  <!-- _if lt IE 9_><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><!_endif_-->
  <script type="text/javascript" src="//use.typekit.net/tsr6tmt.js"></script>
  <script type="text/javascript">
  <!--//--><![CDATA[//><!--
  try{Typekit.load();}catch(e){}
  //--><!]]>
  </script>
</head>
<body<?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>