<?php

namespace Ceres\ShopBuilder\DataFieldProvider\Item;

use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Property\Contracts\PropertyGroupRepositoryContract;
use Plenty\Modules\Item\Property\Models\Property;
use Plenty\Modules\ShopBuilder\Providers\DataFieldProvider;

class PropertyGroupDataFieldProvider extends DataFieldProvider
{
    function register()
    {
        $this->addChildProvider(
            'Ohne Gruppe',
            PropertyListDataFieldProvider::class,
            ['propertyGroup' => null]
        );
    
        /** @var PropertyGroupRepositoryContract $propertyRepo */
        $propertyGroupRepo = pluginApp(PropertyGroupRepositoryContract::class);
        /** @var AuthHelper $authHelper */
        $authHelper = pluginApp(AuthHelper::class);
    
        $propertyGroups = $authHelper->processUnguarded(function() use ($propertyGroupRepo) {
            return $propertyGroupRepo->listGroups(1, 200, [], []);
        });
        
        /** @var Property $property */
        foreach ($propertyGroups->getResult() as $propertyGroup)
        {
            $this->addChildProvider(
                $propertyGroup->names->first()->name,
                PropertyListDataFieldProvider::class,
                ['propertyGroup' => $propertyGroup]
            );
        }
    }
}