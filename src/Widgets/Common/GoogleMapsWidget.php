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

    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Common.GoogleMapsWidget';

    /**
     * @inheritDoc
     */
    public function getData(): array
    {
        return WidgetDataFactory::make('Ceres::GoogleMapsWidget')
            ->withLabel('Widget.googleMapsLabel')
            ->withPreviewImageUrl('/images/widgets/google-maps.svg')
            ->withType(WidgetTypes::DEFAULT)
            ->withPosition(1050)
            ->withSearchKeyWords([
                "google", "maps", "karte", "location", "anfahrt"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings(): array
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
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
            ->withDefaultValue('3-1')
            ->withName('Widget.googleMapsAspectRatioLabel')
            ->withTooltip('Widget.googleMapsAspectRatioTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('3-1', 'Widget.googleMapsAspectRatioThreeToOne')
                    ->addEntry('2-1', 'Widget.googleMapsAspectRatioTwoToOne')
                    ->addEntry('1-1', 'Widget.googleMapsAspectRatioOneToOne')
                    ->toArray()
            );

        $settings->createSpacing();

        return $settings->toArray();
    }
}
