<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PrivacySettingsWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.PrivacySettingsWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::PrivacySettingsWidget")
            ->withLabel("Widget.privacySettingsLabel")
            ->withPreviewImageUrl("/images/widgets/privacy-settings.svg")
            ->withType(WidgetTypes::STATIC)
            ->withPosition(1200)
            ->withSearchKeyWords([
                "privatsphäre", "einstellungen", "provicy", "policy", "properties"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance(true);

        $settings->createSpacing();

        return $settings->toArray();
    }
}
