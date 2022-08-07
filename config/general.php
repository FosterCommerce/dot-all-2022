<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('CRAFT_ENVIRONMENT') === 'dev';
$isProd = App::env('CRAFT_ENVIRONMENT') === 'production';

return [
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,

    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => App::env('CRAFT_SECURITY_KEY'),

    // Custom aliases for Nuxt Build, local assets, and the Live Preview with Nuxt
    'aliases' => [
        '@distBasePath' => dirname(__DIR__) . '/web/dist',
        '@assetBasePath' => dirname(__DIR__) . '/web/assets',
        '@assetBaseUrl' => getenv('ASSET_BASE_URL'),
        '@nuxtBaseUrl' => getenv('NUXT_BASE_URL')
    ],
    
    // The domain for the Craft control panel
    'baseCpUrl' => getenv('CRAFT_BASE_URL'),

    // Whether Dev Mode should be enabled (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => $isDev,

    // Whether administrative changes should be allowed
    'allowAdminChanges' => $isDev,

    // Whether crawlers should be allowed to index pages and following links
    'disallowRobots' => !$isProd,
];
