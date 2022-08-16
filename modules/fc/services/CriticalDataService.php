<?php

namespace modules\fc\services;

use Craft;
use craft\base\Component;

class CriticalDataService extends Component {
    /**
     * Get the CSRF token from Craft
     *
     * @return array
     */
    public function getCsrfToken(): array {
        return [
            'name'  => Craft::$app->getConfig()->getGeneral()->csrfTokenName,
            'token' => Craft::$app->request->getCsrfToken()
        ];
    }
}
