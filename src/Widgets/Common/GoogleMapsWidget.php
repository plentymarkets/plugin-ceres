<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class GoogleMapsWidget extends BaseWidget
{
    protected $template = 'Ceres::Widgets.Common.GoogleMapsWidget';

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $address = $widgetSettings['address']['mobile'];

        $apiKey = $widgetSettings['apiKey']['mobile'];

        if (empty($address) || empty($apiKey))
        {
            return [
                'geocoding_data' => false
            ];
        }

        return [
            'geocoding_data' => [
                'address' => $address,
                'apiKey' => $apiKey
            ]
        ];


    }
}
