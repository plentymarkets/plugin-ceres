<?php

namespace Ceres\Widgets\Category;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ItemsPerPageWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemsPerPageWidget";
    
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ItemsPerPageWidget')
                                ->withLabel('Widget.ItemsPerPageLabel')
                                ->withPreviewImageUrl('/images/widgets/items-per-page.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(200)
                                ->toArray();
    }
    
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);
        
        $settings->createCustomClass();
        
        $container = $settings->createVerticalContainer('entries')
                              ->withList(1)
                              ->withName('Widget.ItemsPerPageEntryLabel');
        
        $container->children->createText('text')
                            ->withDefaultValue(20)
                            ->withName('Widget.ItemsPerPageEntryNameLabel')
                            ->withTooltip('Widget.ItemsPerPageEntryNameTooltip');
        
        $settings->createSpacing(false, true);
        
        return $settings->toArray();
    }
    
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $listEntries  = [];
        $itemsPerPage = [];
        $result       = [];
        if (array_key_exists('entries', $widgetSettings)) {
            $listEntries = $widgetSettings["entries"]["mobile"];
        }
        
        foreach ($listEntries as $i => $listEntry) {
            if (is_int((int)$listEntry['text'])) {
                $itemsPerPage[] = (int)$listEntry["text"];
            }
        }
        
        $result["itemsPerPageEntries"] = $itemsPerPage;
        return $result;
    }
    
    protected function getPreviewData($widgetSettings)
    {
        /**
         * @var CeresConfig $config
         */
        $config = pluginApp(CeresConfig::class);
        return ["itemsPerPage" => $config->pagination->itemsPerPage];
    }
}
