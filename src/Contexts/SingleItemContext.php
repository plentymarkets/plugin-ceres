<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use IO\Services\CustomerService;
use IO\Services\ItemService;
use Plenty\Plugin\ConfigRepository;


class SingleItemContext extends GlobalContext implements ContextInterface
{
    public $item;
    
    public $variations;
    public $attributeNameMap;
    public $variationUnits;
    public $customerShowNetPrices;
    
    public function init($params)
    {
        parent::init($params);
        
        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);
        /** @var ConfigRepository $configRepository */
        $configRepository = pluginApp(ConfigRepository::class);
        
        $this->item = $params['item'];
        $itemData = $this->item['documents'][0]['data'];

        $availabiltyId = $itemData['variation']['availability']['id'];
        $mappedAvailability = $configRepository->get('Ceres.availability.mapping.availability' . $availabiltyId);
        $itemData['variation']['availability']['mappedAvailability'] = $mappedAvailability;
        
        /** @var ItemService $itemService */
        $itemService = pluginApp(ItemService::class);
        
        $this->variations = $itemService->getVariationAttributeMap($itemData['item']['id']);
        
        $list = $itemService->getAttributeNameMap($itemData['item']['id']);
        $this->attributeNameMap = $list['attributes'];
        $this->variationUnits = $list['units'];
        
        $this->customerShowNetPrices = $customerService->showNetPrices();
    }
}
