<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Illuminate\Support\Collection;
use IO\Helper\Utils;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Property\V2\Contracts\PropertyRepositoryContract;
use Plenty\Modules\Property\V2\Models\Property;
use Plenty\Modules\Property\V2\Models\PropertyGroup;
use Plenty\Modules\Property\V2\Models\PropertyGroupName;
use Plenty\Modules\Property\V2\Models\PropertyOption;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;
use Plenty\Plugin\Translation\Translator;

/**
 * Class PropertyGroupDataFieldProvider
 *
 * This class is a data field provider centered on the topic of property groups.
 * It divides its data into groups and single properties and delegates to child providers.
 * It is used to enable placeholders for dynamic data in the ShopBuilder's text widget.
 * Please refer to the parent class for more information about DataFieldProviders.
 * Please refer to https://developers.plentymarkets.com/dev-doc/result-fields-ceres for more information about
 * the data fields.
 * @package Ceres\ShopBuilder\DataFieldProvider\Item
 */
class PropertyGroupDataFieldProvider extends DataFieldProvider
{
    static $noneGroupId = -1;
    static $properties = null;
    static $groupNames = [];

    /**
     * Registers item data fields for use in the ShopBuilder.
     */
    function register()
    {
        if (is_null(self::$properties)) {
            /** @var AuthHelper $authHelper */
            $authHelper = pluginApp(AuthHelper::class);
            $filters = ['type' => 'item', 'lang' => Utils::getLang()];

            $propertyList = $authHelper->processUnguarded(
                function () use ($filters) {
                    /** @var PropertyRepositoryContract $propertyRepo */
                    $propertyRepo = pluginApp(PropertyRepositoryContract::class);
                    $propertyRepo->setFilters($filters);
                    $result = [];
                    $i = 0;
                    do {
                        $i++;
                        $data = $propertyRepo->search(['names', 'options'], 250, $i);
                        $result = array_merge($result, $data);
                    } while(count($data) != 0 && $i != 6);
                    return $result;
                }
            );

            if (!is_null($propertyList)) {
                $propertyList = Collection::make($propertyList);
                $plentyId = Utils::getPlentyId();
                $types = ['empty', 'int', 'float', 'selection', 'string', 'text', 'html', 'date', 'file'];
                $propertyList->filter(
                    function ($property) use ($types, $plentyId) {
                        /** @var Property $property */
                        if (!in_array($property->cast, $types)) {
                            return false;
                        }

                        if (count($property->options) === 0) {
                            return false;
                        }

                        $propertyOptions = $property->options;
                        $clientOptions = $propertyOptions->where('type', 'clients');
                        if (count($clientOptions) === 0 || !$this->hasOptionValue($clientOptions, $plentyId)) {
                            return false;
                        }

                        $displayOptions = $propertyOptions->where('type', 'display');
                        if (count($displayOptions) === 0 || !$this->hasOptionValue(
                                $displayOptions,
                                'showOnItemsPage'
                            )) {
                            return false;
                        }

                        $referrerOptions = $propertyOptions->where('type', 'referrers');
                        if (count($referrerOptions) === 0 || !$this->hasOptionValue($referrerOptions, 1)) {
                            return false;
                        }

                        return true;
                    }
                )->each(
                    function ($property) {
                        /** @var Property $property */
                        $property->groups->each(
                            function ($group) use ($property) {
                                /** @var PropertyGroup $group */
                                $this->addPropertyToGroup($property, $group->id);
                            }
                        );
                    }
                );
            }
        }

        $this->addProvider();
    }

    /**
     * Check conditions
     *
     * @param $propertyOptions
     * @param $needle
     * @return bool
     */
    private function hasOptionValue($propertyOptions, $needle) {
        $hit = false;
        $propertyOptions->each(
            function ($propertyOption) use ($needle, &$hit) {
                /** @var PropertyOption $propertyOption */
                if ($propertyOption->where('value', $needle)->count() > 0) {
                    $hit = true;
                    return false;
                }
            }
        );

        return $hit;
    }

    /**
     * Add properties to a property group
     *
     * @param Property $property
     * @param int $groupId
     */
    private function addPropertyToGroup(Property $property, int $groupId)
    {
        if (isset(self::$properties[$groupId])) {
            self::$properties[$groupId][] = $property;
        } else {
            self::$properties[$groupId] = [$property];
        }
    }

    /**
     * Add properties and group to provider
     */
    private function addProvider()
    {
        $properties = self::$properties ?? [];

        if (isset($properties[self::$noneGroupId])) {
            /** @var Translator $translator */
            $translator = pluginApp(Translator::class);

            $this->addChildProvider(
                $translator->trans('Ceres::Widget.dataFieldPropertyGroupWithoutName'),
                PropertyListDataFieldProvider::class,
                ['properties' => $properties[self::$noneGroupId], 'propertyGroupId' => null]
            );
            unset($properties[self::$noneGroupId]);
        }

        if (count($properties)) {
            ksort($properties);
            foreach ($properties as $propertyGroupId => $propertiesFromGroup) {
                if (isset(self::$groupNames[$propertyGroupId])) {
                    $groupName = self::$groupNames[$propertyGroupId];
                } else {
                    $groupName = $propertiesFromGroup[0]->groups->where('id', $propertyGroupId)->first()->names->where(
                        'lang',
                        Utils::getLang()
                    )->first();

                    if (is_null($groupName)) {
                        $groupName = $propertiesFromGroup[0]->groups->where('id', $propertyGroupId)->first(
                        )->names->first();
                    }

                    /** @var PropertyGroupName $groupName */
                    $groupName = $groupName->name;
                    self::$groupNames[$propertyGroupId] = $groupName;
                }

                $this->addChildProvider(
                    $groupName,
                    PropertyListDataFieldProvider::class,
                    ['properties' => $propertiesFromGroup, 'propertyGroupId' => $propertyGroupId]
                );
            }
        }
    }
}
