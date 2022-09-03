<?php

namespace modules\fc\services;

use Craft;
use craft\base\Component;

class AddressesService extends Component {
    /**
     * Get an address by it's ID
     *
     * @return array
     */
    public function getAddressById($addressId): array {

        $address = \craft\elements\Address::find()
			->id($addressId)
			->one();

        return $address->toArray();
			
    }
    /**
     * Update an address
     *
     * @return array
     */
    public function updateAddress($address): array {

        $address = \craft\elements\Address::find()
			->id($address['id'])
			->one();

        if ($address) {

            $address->setFieldValues($address);

            Craft::$app->elements->saveElement($address);

        }

        return $address;
			
    }
}
