<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\ItemSearch\SearchPresets\SingleItem;
use IO\Services\ItemSearch\Services\ItemSearchService;
use Plenty\Modules\LiveShopping\Contracts\LiveShoppingRepositoryContract;
use Plenty\Modules\LiveShopping\Models\LiveShopping;

class LiveShoppingWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Common.LiveShoppingWidget";
    
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        /** @var LiveShoppingRepositoryContract $liveShoppingRepo */
        $liveShoppingRepo = pluginApp(LiveShoppingRepositoryContract::class);
        /** @var LiveShopping $liveShopping */
        $liveShopping = $liveShoppingRepo->getByLiveShoppingId($widgetSettings['liveShoppingSelection']['mobile']);
    
        $itemSearchOptions = [
            'itemId'        => $liveShopping->itemId,
            //'variationId'   => 1012,
            'setCategory'   => true
        ];
        /** @var ItemSearchService $itemSearchService */
        $itemSearchService = pluginApp( ItemSearchService::class );
        $itemList = $itemSearchService->getResults([
            SingleItem::getSearchFactory( $itemSearchOptions )
        ]);
        
        $test = true;
        
        $liveShoppingData = $liveShopping->toArray();
        $liveShoppingData['settings'] = $this->transformWidgetSettings($widgetSettings);
        
        return [
            'liveShoppingData' => $liveShoppingData,
            'item' => $itemList[0]['documents'][0]
        ];
    }
    
    private function transformWidgetSettings($widgetSettings)
    {
        $transformedSettings = [];
        foreach($widgetSettings as $key => $setting)
        {
            $transformedSettings[$key] = $setting['mobile'];
        }
        
        return $transformedSettings;
    }
}
