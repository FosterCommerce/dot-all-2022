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

    public function getStoreCountries(): array {
        return Plugin::getInstance()->getStore()->getStore()->getCountriesList();
    }

    public function getStoreRegions(): array {
        return Plugin::getInstance()->getStore()->getStore()->getAdministrativeAreasListByCountryCode();
    }

    public function getStorePaymentGateways(): array {
        $gateways = Plugin::getInstance()->gateways->getAllCustomerEnabledGateways();
        $result   = [];

        foreach ($gateways as $gateway) {
            $newGateway = [];

            foreach ($gateway as $k => $v) {
                if (preg_match('/^\$[A-Z0-9_]/', $v)) {
                    $v = getenv(str_replace('$', '', $v));
                }

                $newGateway[$k] = $v;
            }

            $result[] = $newGateway;
        }

    	return $result;
	}
}
