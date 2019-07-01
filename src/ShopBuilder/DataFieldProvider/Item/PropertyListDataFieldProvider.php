<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use IO\Services\SessionStorageService;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Property\Contracts\PropertyRepositoryContract;
use Plenty\Modules\Property\Models\Property;
use Plenty\Modules\Property\Models\PropertyGroup;
use Plenty\Modules\Property\Models\PropertyOption;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;
use Plenty\Plugin\Application;

/**
 * Class PropertyListDataFieldProvider
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class PropertyListDataFieldProvider extends DataFieldProvider
{
    /** @var PropertyGroup */
    private $propertyGroup = null;
    
    /**
     * PropertyListDataFieldProvider constructor.
     * @param PropertyGroup $propertyGroup
     */
    public function __construct($propertyGroup)
    {
        $this->propertyGroup = $propertyGroup;
    }
    
    function register()
    {
        $types = ['empty', 'int', 'float', 'selection', 'shortText', 'longText', 'date'];
        
        $propertyGroupId = null;
        if(!is_null($this->propertyGroup))
        {
            $propertyGroupId = $this->propertyGroup->id;
        }
        
        /** @var PropertyRepositoryContract $propertyRepo */
        //$propertyRepo = pluginApp(PropertyRepositoryContract::class);
        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);
        
        $properties = [];
        
        //$filters = ['typeIdentifier' => 'item', 'casts' => $types, 'lang' => pluginApp(SessionStorageService::class)->getLang()];
        $filters = ['typeIdentifier' => 'item', 'lang' => pluginApp(SessionStorageService::class)->getLang()];
        if(!is_null($propertyGroupId))
        {
            $filters['group'] = $propertyGroupId;
        }
        
        $propertyResult = $authHelper->processUnguarded(function() use ($propertyGroupId, $filters) {
            //$propertyRepo->setFilters($filters);
            /** @var PropertyRepositoryContract $propertyRepo */
            $propertyRepo = pluginApp(PropertyRepositoryContract::class);
            return $propertyRepo->listProperties(1, 200, ['names', 'options'], $filters, 1);
        });
        
        if(!is_null($propertyResult))
        {
            /** @var Application $app */
            $app = pluginApp(Application::class);
            $plentyId = $app->getPlentyId();
            $referrer = 1;
            
            $propertyList = $propertyResult->getResult();
            if(is_null($propertyGroupId))
            {
                $propertyList = $propertyList->filter(function($property) {
                    return count($property->groups) == 0;
                });
            }
            
            /** @var Property $property */
            foreach($propertyList as $property)
            {
                if(in_array($property->cast, $types))
                {
                    $propertyOptions = $property->options;
                    if(count($propertyOptions))
                    {
                        $clientOptions =   $propertyOptions->where('typeOptionIdentifier', 'clients');
                        $displayOptions =  $propertyOptions->where('typeOptionIdentifier', 'display');
                        $referrerOptions = $propertyOptions->where('typeOptionIdentifier', 'referrers');
        
                        if(count($clientOptions) && count($displayOptions) && count($referrerOptions))
                        {
                            $hasDisplayOptionItemPage = $this->hasOptionValue($displayOptions, 'showOnItemsPage');
                            $isVisibleForClient       = $this->hasOptionValue($clientOptions, $plentyId);
                            $hasReferrer              = $this->hasOptionValue($referrerOptions, $referrer);
            
                            if($hasDisplayOptionItemPage && $isVisibleForClient && $hasReferrer)
                            {
                                $properties[] = $property;
                            }
                        }
                    }
                }
            }
        }
        
        if(count($properties))
        {
            if(!is_null($this->propertyGroup))
            {
                $this->addField("name_$propertyGroupId", "Ceres::Widget.dataFieldPropertyGroupName", "item_data_field('variationPropertyGroups.{id, $propertyGroupId}.names.name')");
            }
            
            /** @var Property $property */
            foreach ($properties as $property)
            {
                $this->addChildProvider(
                    $property->names->first()->name,
                    PropertyDataFieldProvider::class,
                    ['property' => $property]
                );
            }
        }
    }
    
    /**
     * @param $options
     * @param $value
     * @return bool
     */
    private function hasOptionValue($options, $value)
    {
        /** @var PropertyOption $clientOption */
        foreach($options as $option)
        {
            $optionValues = $option->propertyOptionValues;
            $hasValue = count($optionValues->where('value', $value)) > 0;
            if($hasValue)
            {
                return true;
            }
        }
        
        return false;
    }
}