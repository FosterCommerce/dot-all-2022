<?php

namespace modules\fc;

use yii\base\Event;
use yii\base\Module;

use Craft;

use craft\web\UrlManager;
use craft\events\RegisterUrlRulesEvent;
use craft\web\twig\variables\CraftVariable;

use modules\ew\variables\FcVariable;

class Fc extends Module
{

	public static $instance;

	public function init()
    {

        // Define a custom alias named after the namespace
        Craft::setAlias('@modules/fc', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'modules\\fc\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\fc\\controllers';
        }

		$this->setComponents([
			
		]);


        parent::init();
		self::$instance = $this;

        // Register our site routes
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
            }
        );

		 // Register our variables
		 Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('fc', FcVariable::class);
            }
        );
    }

}
