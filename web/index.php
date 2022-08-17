<?php
/**
 * Craft web bootstrap file
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    var_dump($_POST['action']);
}

// Load shared bootstrap
require dirname(__DIR__) . '/bootstrap.php';

// Load and run Craft
/** @var craft\web\Application $app */
$app = require CRAFT_VENDOR_PATH . '/craftcms/cms/bootstrap/web.php';
$app->run();
