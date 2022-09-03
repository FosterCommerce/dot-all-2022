<?php

namespace modules\fc\controllers;

use Craft;
use craft\web\Controller;

use yii\web\Response;

use modules\fc\Fc;

class AddressesController extends Controller
{
    protected array|bool|int $allowAnonymous = true;

    /**
     * Get the address from the addresses service
     *
     * @return Response
     */
    public function actionGetAddress() : Response {

		$this->requireAcceptsJson();

		$response = [
            'success' => true,
            'address' => null
        ];

		$addressId = $this->request->getQueryParam('addressId');

		if ($addressId) {

			$address = $response['address'] = Fc::getInstance()->addresses->getAddressById($addressId);

		}

        return $this->asJson($response);
    }
    /**
     * Get the address from the addresses service
     *
     * @return Response
     */
    public function actionUpdateAddress() : Response {

		$this->requirePostRequest();

		$response = [
            'success' => true,
            'address' => null
        ];

		$address = $this->request->getParam('address');

		if ($address) {

			$address = $response['address'] = Fc::getInstance()->addresses->updateAddress($address);

		}

        return $this->asJson($response);
    }

}
