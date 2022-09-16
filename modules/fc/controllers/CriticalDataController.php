<?php

namespace modules\fc\controllers;

use Craft;
use craft\web\Controller;

use yii\web\Response;

use modules\fc\Fc;

class CriticalDataController extends Controller
{
    protected array|bool|int $allowAnonymous = [ 'get-csrf-token' ];

    /**
     * Get the CSRF token from the Critical Data service
     *
     * @return Response
     */
    public function actionGetCsrfToken() : Response {
        $response = [
            'success'   => true,
            'csrfToken' => ''
        ];

        if (Craft::$app->getConfig()->getGeneral()->enableCsrfProtection) {
            $response['csrfToken'] = Fc::getInstance()->critical->getCsrfToken();
        }

        return $this->asJson($response);
    }

    public function actionGetCountries() : Response {
        $this->requireAcceptsJson();

        $response = [
            'success' => true,
            'countries' => []
        ];

        $response['countries'] = Fc::getInstance()->critical->getCountries();

        return $this->asJson($response);
    }

    public function actionGetRegions() : Response {
        $response = [
            'success' => true,
            'regions' => []
        ];

        $countryId = $this->request->getQueryParam('countryId');

        if ($countryId) {
            $response['regions'] = Fc::getInstance()->critical->getRegions($countryId);
        }

        return $this->asJson($response);
    }
}
