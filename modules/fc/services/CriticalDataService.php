<?php

namespace modules\fc\services;

use Craft;
use craft\base\Component;

class CriticalDataService extends Component {
    /**
     * Get the CSRF token from Craft
     *
     * @return string
     */
    public function getCsrfToken(): string {
        return Craft::$app->request->getCsrfToken();
    }
}
