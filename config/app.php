<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

use craft\helpers\App;

return [
    'id' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
    'modules' => [
        'fc' => \modules\fc\Fc::class,
    ],
    'bootstrap' => [
        'fc'
    ],
    /** Sets global cors functionality.
     * 
     * "globalCors" could be named anything as this is a global behavior.
     * 
     * This allows support for OPTIONS and other similar requests and explicitly
     * defines the allowed origins.
     * 
     */
    'as globalCors' => function () {

        $request = Craft::$app->request;
        $generalConfig = Craft::$app->getConfig()->getGeneral();

        $origins = [];

        if (!Craft::$app->request->isConsoleRequest) {

            if (is_array($generalConfig->allowedGraphqlOrigins)) {

                if ($request->getOrigin() !== null) {

                    $requestedOrigins = array_filter(array_map('trim', explode(',', $request->getOrigin())));

                    foreach ($requestedOrigins as $origin) {

                        if (in_array($origin, $generalConfig->allowedGraphqlOrigins)) {

                            $origins[] = $origin;
                        }
                    }
                }
            } elseif ($generalConfig->allowedGraphqlOrigins !== false) {

                $origins[] = $request->getOrigin();
            }
        }
        return [
            'class' => \modules\fc\filter\Cors::class,
            'cors' => [
                'Origin' => $origins,
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Allow-Headers' => [
                    '*'
                ],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 3600,
            ],

        ];
    }

];
