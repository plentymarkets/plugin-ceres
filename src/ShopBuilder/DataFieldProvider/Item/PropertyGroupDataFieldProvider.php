<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use IO\Helper\Utils;
use IO\Services\SessionStorageService;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Property\Contracts\PropertyGroupRepositoryContract;
use Plenty\Modules\Item\Property\Models\Property;
use Plenty\Modules\Property\Contracts\PropertyRepositoryContract;
use Plenty\Modules\Property\Models\PropertyOption;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;
use Plenty\Plugin\Application;
use Plenty\Plugin\Translation\Translator;

class PropertyGroupDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);

        $propertiesWithoutGroup = $this->getPropertiesByGroup(null);
        if(count($propertiesWithoutGroup))
        {
            $this->addChildProvider(
                $translator->trans('Ceres::Widget.dataFieldPropertyGroupWithoutName'),
                PropertyListDataFieldProvider::class,
                ['properties' => $propertiesWithoutGroup, 'propertyGroupId' => null]
            );
        }

        /** @var PropertyGroupRepositoryContract $propertyRepo */
        $propertyGroupRepo = pluginApp(PropertyGroupRepositoryContract::class);
        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);

        $propertyGroupsList = $authHelper->processUnguarded(function() use ($propertyGroupRepo) {
            return $propertyGroupRepo->listGroups(1, 200, [], []);
        });

        $propertyGroups = $propertyGroupsList->getResult();
        if(count($propertyGroups))
        {
            $propertyGroups = $propertyGroups->sortBy('id');
            /** @var Property $property */
            foreach ($propertyGroups as $propertyGroup)
            {
                $properties = $this->getPropertiesByGroup($propertyGroup);

                if(count($properties))
                {
                    $this->addChildProvider(
                        $propertyGroup->names->first()->name,
                        PropertyListDataFieldProvider::class,
                        ['properties' => $properties, 'propertyGroupId' => $propertyGroup->id]
                    );
                }
            }
        }
    }

    private function getPropertiesByGroup($propertyGroup)
    {
        $types = ['empty', 'int', 'float', 'selection', 'shortText', 'longText', 'date', 'file'];

        $propertyGroupId = null;
        if(!is_null($propertyGroup))
        {
            $propertyGroupId = $propertyGroup->id;
        }

        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);

        $properties = [];

        $filters = ['typeIdentifier' => 'item', 'lang' => Utils::getLang()];
        if(!is_null($propertyGroupId))
        {
            $filters['group'] = $propertyGroupId;
        }

        $propertyList = $authHelper->processUnguarded(function() use ($propertyGroupId, $filters) {
            /** @var PropertyRepositoryContract $propertyRepo */
            $propertyRepo = pluginApp(PropertyRepositoryContract::class);
            return $propertyRepo->listProperties(1, 200, ['names', 'options'], $filters, 0, ['id' => 'asc']);
        });

        if(!is_null($propertyList))
        {
            /** @var Application $app */
            $app = pluginApp(Application::class);
            $plentyId = $app->getPlentyId();
            $referrer = 1;

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

        return $properties;
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
