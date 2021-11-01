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
     * @var string $brand Contains the "brand" name for SEO attribute.
     */
    public $brand = '';

    /**
     * @var string $manufacturer Contains the "manufacturer" name for SEO attribute.
     */
    public $manufacturer = '';

    /**
     * @var string $gtin Contains the "GTIN" Barcode for SEO attribute.
     */
    public $gtin = '';

    /**
     * @var string $gtin8 Contains the "GTIN8" Barcode for SEO attribute.
     */
    public $gtin8 = '';

    /**
     * @var string $gtin13 Contains the "GTIN13" Barcode for SEO attribute.
     */
    public $gtin13 = '';

    /**
     * @var string $isbn Contains the "ISBN" Barcode for SEO attribute.
     */
    public $isbn = '';

    /**
     * @var string $mpn Contains the "MPN" Barcode for SEO attribute.
     */
    public $mpn = '';

    /**
     * @var string $priceValidUntil Contains the date until the price of item is valid for SEO attribute.
     */
    public $priceValidUntil = '';

    /**
     * @var string $sku Contains the SKU code for SEO attribute.
     */
    public $sku = '';

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

        $availabilityId = $itemData['variation']['availability']['id'];
        $mappedAvailability = $configRepository->get('Ceres.availability.mapping.availability' . $availabilityId);
        $this->item['documents'][0]['data']['variation']['availability']['mappedAvailability'] = $mappedAvailability;

        $brandMapping = $this->ceresConfig->seo->brandMapping;
        $brandMappingId = $this->ceresConfig->seo->brandMappingId;
        if ($brandMapping == 2) {
            $this->brand = $itemData['item']['manufacturer']['externalName'];
        } elseif ($brandMapping == 3) {
            $this->brand = $this->getVariationProperty($itemData['variationProperties'], $brandMappingId);
        }

        $manufacturerMapping = $this->ceresConfig->seo->manufacturerMapping;
        if ($manufacturerMapping == 2) {
            $this->manufacturer = $itemData['item']['manufacturer']['externalName'] ?? '';
        } elseif ($manufacturerMapping == 3) {
            $this->manufacturer = $itemData['item']['manufacturer']['name'];
        }

        $gtinMapping = $this->ceresConfig->seo->gtinMapping;
        $gtinMappingId = $this->ceresConfig->seo->gtinMappingId;
        if ($gtinMapping == 2) {
            $barcodeType = 'GTIN';
            $this->gtin = $this->getFirstBarcode($itemData['barcodes'], $barcodeType);
        } elseif ($gtinMapping == 3) {
            $this->gtin = $this->getBarcodeWithId($itemData['barcodes'], $gtinMappingId);
        }

        $gtin8Mapping = $this->ceresConfig->seo->gtin8Mapping;
        $gtin8MappingId = $this->ceresConfig->seo->gtin8MappingId;
        if ($gtin8Mapping == 2) {
            $barcodeType = "GTIN_8";
            $this->gtin8 = $this->getFirstBarcode($itemData['barcodes'], $barcodeType);
        } elseif ($gtin8Mapping == 3) {
            $this->gtin8 = $this->getBarcodeWithId($itemData['barcodes'], $gtin8MappingId);
        }

        $gtin13Mapping = $this->ceresConfig->seo->gtin13Mapping;
        $gtin13MappingId = $this->ceresConfig->seo->gtin13MappingId;
        if ($gtin13Mapping == 2) {
            $barcodeType = "GTIN_13";
            $this->gtin13 = $this->getFirstBarcode($itemData['barcodes'], $barcodeType);
        } elseif ($gtin13Mapping == 3) {
            $this->gtin13 = $this->getBarcodeWithId($itemData['barcodes'], $gtin13MappingId);
        }

        $isbnMapping = $this->ceresConfig->seo->isbnMapping;
        $isbnMappingId = $this->ceresConfig->seo->isbnMappingId;
        if ($isbnMapping == 2) {
            $barcodeType = "ISBN";
            $this->isbn = $this->getFirstBarcode($itemData['barcodes'], $barcodeType);
        } elseif ($isbnMapping == 3) {
            $this->isbn = $this->getBarcodeWithId($itemData['barcodes'], $isbnMappingId);
        }

        $mpnMapping = $this->ceresConfig->seo->mpnMapping;
        $mpnMappingId = $this->ceresConfig->seo->mpnMappingId;
        if ($mpnMapping == 2) {
            $this->mpn = $itemData['variation']['externalId'];
        } elseif ($mpnMapping == 3) {
            $this->mpn = $this->getVariationProperty($itemData['variationProperties'], $mpnMappingId);
        }

        $priceValidUntilMappingId = $this->ceresConfig->seo->priceValidUntilMappingId;
        if ($priceValidUntilMappingId > 0) {
            $orgDate = $this->getVariationProperty($itemData['variationProperties'], $priceValidUntilMappingId);
            if(strlen($orgDate)) {
                $orgDate = date("Y-m-d", strtotime($orgDate));
            }
            $this->priceValidUntil = $orgDate;
        }

        $skuMapping = $this->ceresConfig->seo->skuMapping;
        $skuMappingId = $this->ceresConfig->seo->skuMappingId;
        switch($skuMapping) {
            case 1:
                $this->sku = $itemData['variation']['id'];
                break;
            case 2:
                $this->sku = $itemData['variation']['number'];
                break;
            case 3:
                $this->sku = $this->getVariationProperty($itemData['variationProperties'], $skuMappingId);
                break;
            case 4:
                $this->sku = $itemData['item']['id'];
        }

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

    /**
     * @param $referrers
     *
     * @return bool
     */
    private function isWebshopReferrer($referrers)
    {
        if($referrers[0] == -1) {
            return true;
        }
        foreach ($referrers as $referrer) {
            if($referrer == 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param array $variationPropertyGroups
     * @param $mappingPropertyId
     *
     * @return string
     */
    private function getVariationProperty($variationPropertyGroups, $mappingPropertyId) {
        $variationProperty = '';
        foreach ($variationPropertyGroups as $propertyGroup) {
            foreach ($propertyGroup['properties'] as $property) {
                if ($property['id'] == $mappingPropertyId) {
                    $variationProperty = $property['values']['value'];
                    break 2;
                }
            }
        }
        return $variationProperty;
    }

    /**
     * @param $barcodes
     * @param $barcodeType
     *
     * @return string
     */
    private function getFirstBarcode($barcodes, $barcodeType){
        $barcode = '';
        foreach ($barcodes as $property) {
            if (strpos($property['type'], $barcodeType) === 0 && $this->isWebshopReferrer($property['referrers'])) {
                $barcode = $property['code'];
                break;
            }
        }
        return $barcode;
    }

    /**
     * @param $barcodes
     * @param $barcodeMappingId
     * 
     * @return string
     */
    private function getBarcodeWithId($barcodes, $barcodeMappingId){
        $barcode = '';
        foreach ($barcodes as $property) {
            if ($property['id'] == $barcodeMappingId) {
                $barcode = $property['code'];
                break;
            }
        }
        return $barcode;
    }
}
