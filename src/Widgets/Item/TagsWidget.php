<?php

namespace Ceres\Widgets\Item;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Helper\RouteConfig;
use Plenty\Plugin\Application;
use Plenty\Plugin\Templates\Twig;

class TagsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Item.TagsWidget";
    protected $tagRouteActive = false;
    private $IORouteConfig = null;

    public function __construct(Twig $twig, Application $app)
    {
        parent::__construct($twig, $app);
        /** @var RouteConfig $IORouteConfig */
        $this->IORouteConfig = pluginApp( RouteConfig::class );
        $this->tagRouteActive = $this->IORouteConfig->isActive(RouteConfig::TAGS);
    }

    public function getTemplateData($widgetSettings, $isPreview)
    {
        return ['tagRouteActive' => $this->tagRouteActive];
    }

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TagsWidget")
            ->withLabel("Widget.tagsLabel")
            ->withPreviewImageUrl("/images/widgets/tags.svg")
            ->withType(WidgetTypes::ITEM)
            ->withCategory(WidgetCategories::ITEM)
            ->withPosition(600)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createSelect("tagAppearance")
            ->withName("Widget.widgetTagAppearance")
            ->withTooltip("Widget.widgetTagAppearance")
            ->withListBoxValues(
                ValueListFactory::make()
                 ->addEntry("", "Widget.widgetButtonSizeNormal")
                 ->addEntry("badge-pill", "Widget.widgetTagAppearancePill")
                 ->toArray()
            );
        $settingsFactory->createSelect("buttonSize")
            ->withName("Widget.widgetTagSizeLabel")
            ->withTooltip("Widget.widgetButtonSizeTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("", "Widget.widgetButtonSizeSm")
                    ->addEntry("h4", "Widget.widgetButtonSizeNormal")
                    ->addEntry("h2", "Widget.widgetButtonSizeLg")
                    ->toArray()
            );
        $settingsFactory->createSpacing(false, true);
        return $settingsFactory->toArray();
    }
}
