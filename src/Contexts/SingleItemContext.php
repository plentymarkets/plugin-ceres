<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;
use IO\Services\CategoryService;
use IO\Services\CustomerService;
use IO\Services\ItemService;
use Plenty\Plugin\Application;
use Plenty\Plugin\ConfigRepository;


class SingleItemContext extends GlobalContext implements ContextInterface
{
    public $item;

    public $variations;
    public $attributeNameMap;
    public $variationUnits;
    public $customerShowNetPrices;
    public $defaultCategory;

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
        $this->item['documents'][0]['data']['variation']['availability']['mappedAvailability'] = $mappedAvailability;

        /** @var ItemService $itemService */
        $itemService = pluginApp(ItemService::class);

        $this->variations = $itemService->getVariationAttributeMap($itemData['item']['id']);

        $list = $itemService->getAttributeNameMap($itemData['item']['id']);
        $this->attributeNameMap = $list['attributes'];
        $this->variationUnits = $list['units'];

        $this->customerShowNetPrices = $customerService->showNetPrices();

        $defaultCategoryId = 0;
        $plentyId = (int) pluginApp(Application::class)->getPlentyId();
        foreach($this->item['documents'][0]['data']['defaultCategories'] as $category)
        {
            if ($category['plentyId'] == $plentyId)
            {
                $defaultCategoryId = $category['id'];
                break;
            }
        }

        if($defaultCategoryId > 0)
        {
            /** @var CategoryService $categoryService */
            $categoryService = pluginApp(CategoryService::class);
            $this->defaultCategory = $categoryService->get($defaultCategoryId);
        }
        
        $this->bodyClasses[] = "item-" . $itemData['item']['id'];
        $this->bodyClasses[] = "variation-" . $itemData['variation']['id'];
    }
}
