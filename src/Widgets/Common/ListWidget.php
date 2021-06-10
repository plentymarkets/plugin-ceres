<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Modules\ShopBuilder\Factories\Settings\ValueListFactory;

class ListWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.ListWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ListWidget")
            ->withLabel("Widget.listLabel")
            ->withPreviewImageUrl("/images/widgets/list.svg")
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::TEXT)
            ->withPosition(900)
            ->withSearchKeyWords([
                "liste", "list", "listen", "auflistung", "stichpunkte"
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

        $settings->createText("title")
            ->withDefaultValue("")
            ->withName("Widget.listTitleLabel")
            ->withTooltip("Widget.listTitleTooltip");

        $settings->createIcon();

        $settings->createCheckbox("centered")
            ->withDefaultValue(false)
            ->withName("Widget.listCenteredLabel");

        $container = $settings->createVerticalContainer("entries")
            ->withList(1)
            ->withName("Widget.listEntryLabel");

        $container->children->createText("text")
            ->withName("Widget.listEntryNameLabel")
            ->withTooltip("Widget.listEntryNameTooltip");

        $container->children->createSelect("rel")
            ->withDefaultValue('none')
            ->withName('Widget.listRel')
            ->withTooltip('Widget.listRelTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('none', 'Widget.listRelNone')
                    ->addEntry('nofollow', 'Widget.listRelNofollow')
                    ->addEntry('sponsored', 'Widget.listRelSponsored')
                    ->addEntry('noopener', 'Widget.listRelNoopener')
                    ->toArray()
            );

        $container->children->createUrl("url")
            ->withName("Widget.listEntryUrlLabel")
            ->withTooltip("Widget.listEntryUrlTooltip");

        $settings->createSpacing();

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $listEntries = [];

        if ( array_key_exists("entries", $widgetSettings) )
        {
            $listEntries = $widgetSettings["entries"]["mobile"];
        }
        else
        {
            foreach( $widgetSettings["texts"]["mobile"] as $text )
            {
                $listEntries[] = [
                    "text" => $text,
                    "url"  => ""
                ];
            }
        }

        foreach( $listEntries as $i => $listEntry )
        {
            if ( is_string($listEntry["url"]) )
            {
                $listEntries[$i]["url"] = [
                    "type" => "external",
                    "value" => $listEntry["url"]
                ];
            }
        }

        return [
            "listEntries"   => $listEntries,
            "isLinkList"    => false
        ];
    }
}
