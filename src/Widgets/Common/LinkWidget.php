<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LinkWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.LinkWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LinkWidget")
            ->withLabel("Widget.linkLabel")
            ->withPreviewImageUrl("/images/widgets/link.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(900)
            ->withSearchKeyWords([
                "link", "button", "knopf", "schaltfläche"
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
        $settings->createAppearance();

        $settings->createButtonSize();

        $settings->createCheckbox('outline')
            ->withDefaultValue(false)
            ->withName('Widget.linkOutlineLabel')
            ->withTooltip('Widget.linkOutlineTooltip');

        $settings->createCheckbox("block")
            ->withDefaultValue(false)
            ->withName("Widget.linkBlock");

        $settings->createIcon();

        $settings->createText("text")
            ->withName("Widget.linkTextLabel")
            ->withTooltip("Widget.linkTextTooltip");

        $settings->createText("linkTitle")
            ->withName("Widget.linkTitleTextLabel")
            ->withTooltip("Widget.linkTitleTextTooltip");

        $settings->createSelect('linkRel')
            ->withDefaultValue('none')
            ->withName('Widget.linkRel')
            ->withTooltip('Widget.linkRelTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('none', 'Widget.linkRelNone')
                    ->addEntry('nofollow', 'Widget.linkRelNofollow')
                    ->addEntry('sponsored', 'Widget.linkRelSponsored')
                    ->addEntry('noopener', 'Widget.linkRelNoopener')
                    ->toArray()
            );

        $settings->createUrl("url")
            ->withName("Widget.linkUrlLabel")
            ->withTooltip("Widget.linkUrlTooltip")
            ->withInternalLinks(
                ValueListFactory::make()
                    ->addEntry("return", "Widget.urlReturnLabel")
                    ->addEntry("tracking", "Widget.urlTrackingLabel")
                    ->toArray()
            );

        $settings->createSpacing();

        return $settings->toArray();
    }
}
