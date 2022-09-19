<?php

namespace modules\fc\controllers;

use Craft;
use craft\commerce\models\PaymentCurrency;
use craft\web\Controller;
use craft\commerce\Plugin as Commerce;

class PaymentsController extends Controller {
    protected array|bool|int $allowAnonymous = [ 'get-paypal-form-html' ];

    public function actionGetPaypalFormHtml() {
        $cart = Commerce::getInstance()->getCarts()->getCart();

        $cart->gatewayId = 3;

        return $cart->gateway->getPaymentFormHtml([
            'currency' => $cart->paymentCurrency
        ]);
    }
}
