<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class GoogleMapsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.GoogleMapsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::GoogleMapsWidget")
            ->withLabel("Widget.googleMapsLabel")
            ->withPreviewImageUrl("/images/widgets/google-maps.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withPosition(1050)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createText("apiKey")
            ->withName("Widget.googleMapsApiKeyLabel")
            ->withTooltip("Widget.googleMapsApiKeyTooltip");

        $settings->createTextarea("address")
            ->withName("Widget.googleMapsAddressLabel")
            ->withTooltip("Widget.googleMapsAddressTooltip");

        $settings->createSelect("maptype")
            ->withDefaultValue("roadmap")
            ->withName("Widget.googleMapsMapTypeLabel")
            ->withTooltip("Widget.googleMapsMapTypeTooltip")
            ->withListBoxValues(
              ValueListFactory::make()
                  ->addEntry("roadmap","Widget.googleMapsMapTypeRoadmap")
                  ->addEntry("satellite","Widget.googleMapsMapTypeSatellite")
                  ->addEntry("hybrid","Widget.googleMapsMapTypeHybrid")
                  ->addEntry("terrain","Widget.googleMapsMapTypeTerrain")
                  ->toArray()
            );

        $settings->createNumber("zoom")
            ->withDefaultValue(16)
            ->withName("Widget.googleMapsZoomLabel")
            ->withTooltip("Widget.googleMapsZoomTooltip");

        $settings->createSelect("aspectRatio")
            ->withDefaultValue("prop-xs-3-1")
            ->withName("Widget.googleMapsAspectRatioLabel")
            ->withTooltip("Widget.googleMapsAspectRatioTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("prop-xs-3-1", "Widget.googleMapsAspectRatioThreeToOne")
                    ->addEntry("prop-xs-2-1", "Widget.googleMapsAspectRatioTwoToOne")
                    ->addEntry("prop-xs-1-1", "Widget.googleMapsAspectRatioOneToOne")
                    ->toArray()
            );

        return $settings->toArray();
    }

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
