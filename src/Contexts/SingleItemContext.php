<?php

namespace Ceres\Contexts;

use IO\Helper\Utils;
use IO\Helper\ContextInterface;
use IO\Services\CategoryService;
use IO\Services\CustomerService;
use Plenty\Plugin\ConfigRepository;
use Plenty\Modules\Webshop\Contracts\ContactRepositoryContract;
use Plenty\Modules\Category\Models\Category;


/**
 * Class SingleItemContext
 *
 * Context class with additional data, required for the single item view.
 *
 * @package Ceres\Contexts
 */
class SingleItemContext extends GlobalContext implements ContextInterface
{
    /**
     * @var array $item Item data of the current item.
     */
    public $item;

    /**
     * @var array $attributes Attributes data for the current item. Used for the variation select.
     */
    public $attributes;

    /**
     * @var array $variations Variation data mapped to the attribute IDs. Used for the variation select.
     */
    public $variations;

    /**
     * @var array $afterKey Contains the next variation ID and some data of the next item, to be used to continue fetching variations (@see $variations).
     * The afterKey is only set when the variation selection requires more data than is already loaded in the client.
     */
    public $afterKey;

    /**
     * @var array $customerShowNetPrices Check if net prices should be shown.
     * @deprecated since 5.0.0 will be removed in 6.0.0
     * @see ContactRepositoryContract::showNetPrices()
     */
    public $customerShowNetPrices;

    /**
     * @var Category $defaultCategory
     * Category data of the default category of the current item.
     */
    public $defaultCategory;

    /**
     * @inheritDoc
     */
    public $assetName = "ceres-base";

    /**
     * @var int $dynamicVariationId The variation ID of the variation, linked to the "please select"-option.
     */
    public $dynamicVariationId;

    /**
     * @var bool $initPleaseSelectOption Define if the "please select"-option should be shown in the variation select.
     */
    public $initPleaseSelectOption;

    /**
     * @var bool $isItemSet Defines if an item is of the type "set".
     */
    public $isItemSet;

    /**
     * @var array $setComponents Some data of the variations contained as a component for the current item if the item is of the type "set".
     */
    public $setComponents;

    /**
     * @var array $setAttributeMap Contains arrays with attributes, variations and the afterKey for all set components if the item is of the type "set".
     * @see $attributes, $variations, $afterKey
     */
    public $setAttributeMap = [];

    /**
     * @var string $requestedVariationUrl Represents the current URL without the parameters.
     */
    public $requestedVariationUrl;

    /**
     * @inheritDoc
     */
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
