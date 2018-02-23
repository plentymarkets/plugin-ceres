<?php

namespace Ceres\Contexts;

use IO\Services\CustomerService;
use IO\Services\ItemService;

class SingleItemContext extends GlobalContext implements ContextInterface
{
    public $item;
    
    public $variations;
    public $attributeNameMap;
    public $customerShowNetPrices;
    
    public function init($params, $templateContainer)
    {
        parent::init($params, $templateContainer);
        
        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);
        
        $this->item = $params['item'];
        $itemData = $this->item['documents'][0]['data'];
        
        /** @var ItemService $itemService */
        $itemService = pluginApp(ItemService::class);
        
        $this->variations = $itemService->getVariationAttributeMap($itemData['item']['id']);
        $this->attributeNameMap = $itemService->getAttributeNameMap($itemData['item']['id']);
        $this->customerShowNetPrices = $customerService->showNetPrices();
        
    }
}