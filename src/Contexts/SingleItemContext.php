<?php

namespace Ceres\Contexts;

use IO\Helper\Utils;
use IO\Helper\ContextInterface;
use IO\Services\CategoryService;
use IO\Services\CustomerService;
use Plenty\Plugin\ConfigRepository;


class SingleItemContext extends GlobalContext implements ContextInterface
{
    public $item;
    public $attributes;
    public $variations;
    public $afterKey;
    public $customerShowNetPrices;
    public $defaultCategory;
    public $assetName = "ceres-base";
    public $dynamicVariationId;
    public $initPleaseSelectOption;
    public $isItemSet;
    public $setComponents;
    public $setAttributeMap = [];
    public $requestedVariationUrl;


    public function init($params)
    {
        parent::init($params);

        /** @var CustomerService $customerService */
        $customerService = pluginApp(CustomerService::class);
        /** @var ConfigRepository $configRepository */
        $configRepository = pluginApp(ConfigRepository::class);

        $this->dynamicVariationId = intval($params['dynamic']['documents'][0]['id'] ?? 0);
        $this->initPleaseSelectOption = $this->getParam('initPleaseSelectOption', false);

        $this->item = $params['item'];
        $itemData = $this->item['documents'][0]['data'];

        $availabiltyId = $itemData['variation']['availability']['id'];
        $mappedAvailability = $configRepository->get('Ceres.availability.mapping.availability' . $availabiltyId);
        $this->item['documents'][0]['data']['variation']['availability']['mappedAvailability'] = $mappedAvailability;

        $this->isItemSet = $params['isItemSet'];

        $this->attributes = $params['variationAttributeMap']['attributes'];
        $this->variations = $params['variationAttributeMap']['variations'];
        $this->afterKey =   $params['variationAttributeMap']['afterKey'];
        $this->customerShowNetPrices = $customerService->showNetPrices();

        $this->setComponents = $params['setComponents'];
        $this->setAttributeMap = $params['setAttributeMap'];
        $this->requestedVariationUrl = explode('?', $this->request->getUri())[0];
        $defaultCategoryId = 0;
        $plentyId = Utils::getPlentyId();
        foreach ($this->item['documents'][0]['data']['defaultCategories'] as $category) {
            if ($category['plentyId'] == $plentyId) {
                $defaultCategoryId = $category['id'];
                break;
            }
        }

        if ($defaultCategoryId > 0) {
            /** @var CategoryService $categoryService */
            $categoryService = pluginApp(CategoryService::class);
            $this->defaultCategory = $categoryService->get($defaultCategoryId);
        }

        $this->bodyClasses[] = "item-" . $itemData['item']['id'];
        $this->bodyClasses[] = "variation-" . $itemData['variation']['id'];
    }
}
