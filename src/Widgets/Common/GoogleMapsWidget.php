<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;

class GoogleMapsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.GoogleMapsWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $address = $widgetSettings["address"]["mobile"];

        $apiKey = $widgetSettings["apiKey"]["mobile"];

        if (empty($address) || empty($apiKey))
        {
            return [
                "geocoding_data" => false
            ];
        }

        $address = urlencode($address);

        // google map geocode api url
        $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$address}&key={$apiKey}";

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url
        ));

        $result_json = curl_exec($curl);
        $result = json_decode($result_json, true);

        curl_close($curl);

        $lat = isset($result["results"][0]["geometry"]["location"]["lat"]) ? $result["results"][0]["geometry"]["location"]["lat"] : "";
        $lng = isset($result["results"][0]["geometry"]["location"]["lng"]) ? $result["results"][0]["geometry"]["location"]["lng"] : "";
        $formatted_address = isset($result["results"][0]["formatted_address"]) ? $result["results"][0]["formatted_address"] : "";

        if ($lat && $lng && $formatted_address)
        {
            return [
                "geocoding_data" => [
                    "lat" => $lat,
                    "lng" => $lng,
                    "address" => $formatted_address,
                    "apiKey" => $apiKey
                ]
            ];
        }

        return [
            "geocoding_data" => false
        ];
    }
}
