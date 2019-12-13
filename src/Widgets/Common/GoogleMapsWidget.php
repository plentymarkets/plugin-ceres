<?php

namespace Ceres\Widgets\Common;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Plugin\Log\Loggable;

class GoogleMapsWidget extends BaseWidget
{
    use Loggable;

    protected $template = 'Ceres::Widgets.Common.GoogleMapsWidget';

    public function getData(): array
    {
        return WidgetDataFactory::make('Ceres::GoogleMapsWidget')
            ->withLabel('Widget.googleMapsLabel')
            ->withPreviewImageUrl('/images/widgets/google-maps.svg')
            ->withType(WidgetTypes::DEFAULT)
            ->withPosition(1050)
            ->toArray();
    }

    public function getSettings(): array
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createTextarea('address')
            ->withName('Widget.googleMapsAddressLabel')
            ->withTooltip('Widget.googleMapsAddressTooltip');

        $settings->createSelect('maptype')
            ->withDefaultValue('roadmap')
            ->withName('Widget.googleMapsMapTypeLabel')
            ->withTooltip('Widget.googleMapsMapTypeTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('roadmap', 'Widget.googleMapsMapTypeRoadmap')
                    ->addEntry('satellite', 'Widget.googleMapsMapTypeSatellite')
                    ->addEntry('hybrid', 'Widget.googleMapsMapTypeHybrid')
                    ->addEntry('terrain', 'Widget.googleMapsMapTypeTerrain')
                    ->toArray()
            );

        $settings->createNumber('zoom')
            ->withDefaultValue(16)
            ->withName('Widget.googleMapsZoomLabel')
            ->withTooltip('Widget.googleMapsZoomTooltip');

        $settings->createSelect('aspectRatio')
            ->withDefaultValue('prop-xs-3-1')
            ->withName('Widget.googleMapsAspectRatioLabel')
            ->withTooltip('Widget.googleMapsAspectRatioTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('prop-xs-3-1', 'Widget.googleMapsAspectRatioThreeToOne')
                    ->addEntry('prop-xs-2-1', 'Widget.googleMapsAspectRatioTwoToOne')
                    ->addEntry('prop-xs-1-1', 'Widget.googleMapsAspectRatioOneToOne')
                    ->toArray()
            );

        return $settings->toArray();
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        /** @var CeresConfig $config */
        $config = pluginApp(CeresConfig::class);
        $address = $widgetSettings['address']['mobile'];
        $apiKey = $config->contact->apiKey;

        if (empty($address) || empty($apiKey)) {
            return [
                'location' => null
            ];
        }

        $address = urlencode($address);

        // google map geocode api url
        $url = "https://maps.googleapis.com/maps/api/geocode/json?address={$address}&key={$apiKey}";

        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => $url
            )
        );

        $result_json = curl_exec($curl);
        $result = json_decode($result_json, true);

        curl_close($curl);

        $lat = $result['results'][0]['geometry']['location']['lat'] ?? '';
        $lng = $result['results'][0]['geometry']['location']['lng'] ?? '';

        if ($lat && $lng) {
            return [
                'location' => [
                    'lat' => $lat,
                    'lng' => $lng
                ]
            ];
        }

        if (isset($result['error_message'])) {
            $this->getLogger(__CLASS__)->error(
                'Google Maps API error',
                [
                    'status' => $result['status'],
                    'error' => $result['error_message']
                ]
            );
        }

        return [
            'location' => null
        ];
    }
}
