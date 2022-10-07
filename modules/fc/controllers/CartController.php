<?php

namespace modules\fc\controllers;

use Craft;
use craft\commerce;
use craft\commerce\elements\Variant;
use craft\commerce\elements\Order;
use craft\commerce\controllers\CartController as Commerce_CartController;
use yii\base\InvalidConfigException;
use yii\web\Response;

class CartController extends Commerce_CartController {

    protected array|bool|int $allowAnonymous = [
        'get-cart',
        'load-cart',
        'update-cart',
        'complete',
        'get-order-by-number'
    ];

    /**
     * Get a completed order based on the order number
     *
     * TODO use the event (?) to replicate what has been done on line #83 /modules/fc/Fc.php
     *
     * @return Response
     */
    public function actionGetOrderByNumber(): Response {
        $this->requireAcceptsJson();

        $number = $this->request->getParam('number');

        $response = [
            'success' => true,
            'order'   => []
        ];

        $order = commerce\Plugin::getInstance()->orders->getOrderByNumber($number);

        if ($order) {
            $lineItems = [];

            foreach ($order->lineItems as $lineItem) {
                $item = $lineItem->toArray();
                $item['snapshot'] = $lineItem->snapshot;
                $lineItems[] = $item;
            }

            $response['order']              = $order->toArray();
            $response['order']['lineItems'] = $lineItems;
            $response['order']['pdfUrl']    = $order->pdfUrl;
        } else {
            $response['order'] = null;
        }

        return $this->asJson($response);
    }
}
