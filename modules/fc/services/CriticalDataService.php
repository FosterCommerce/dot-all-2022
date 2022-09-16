<?php

namespace modules\fc\services;

use Craft;
use craft\base\Component;
use craft\commerce\Plugin;

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

    public function getCountries(): array {
        return Plugin::getInstance()->getStore()->getStore()->getCountriesList();
    }

    public function getRegions($countryId): array {
        return Craft::$app->getAddresses()->getSubdivisionRepository()->getList([$countryId]);
        // return Plugin::getInstance()->getStore()->getStore()->getAdministrativeAreasListByCountryCode();
    }
}
