<?php

namespace Ceres\Widgets\Helper\Factories\Settings;

use Plenty\Modules\Webshop\Contracts\WebstoreConfigurationRepositoryContract;
use Plenty\Modules\ShopBuilder\Factories\Settings\ValueListFactory;

class ItemSortValueListFactory extends ValueListFactory
{
    public static function make($withRandomOption = false)
    {
        /** @var WebstoreConfigurationRepositoryContract $webstoreConfigurationRepository */
        $webstoreConfigurationRepository = pluginApp(WebstoreConfigurationRepositoryContract::class);
        $sortBySales = $webstoreConfigurationRepository->getWebstoreConfiguration()->itemSortByMonthlySales === 1;

        $list = parent::make()
            ->addEntry('default.recommended_sorting', 'Widget.itemRecommendedSorting')
            ->addEntry('texts.name1_asc', 'Widget.itemName_asc')
            ->addEntry('texts.name1_desc', 'Widget.itemName_desc')
            ->addEntry('sorting.price.avg_asc', 'Widget.itemPrice_asc')
            ->addEntry('sorting.price.avg_desc', 'Widget.itemPrice_desc')
            ->addEntry('variation.createdAt_desc', 'Widget.itemVariationCreateTimestamp_desc')
            ->addEntry('variation.createdAt_asc', 'Widget.itemVariationCreateTimestamp_asc')
            ->addEntry('variation.availability.averageDays_asc', 'Widget.itemAvailabilityAverageDays_asc')
            ->addEntry('variation.availability.averageDays_desc', 'Widget.itemAvailabilityAverageDays_desc')
            ->addEntry('variation.number_asc', 'Widget.itemVariationCustomNumber_asc')
            ->addEntry('variation.number_desc', 'Widget.itemVariationCustomNumber_desc')
            ->addEntry('variation.updatedAt_asc', 'Widget.itemVariationLastUpdateTimestamp_asc')
            ->addEntry('variation.updatedAt_desc', 'Widget.itemVariationLastUpdateTimestamp_desc')
            ->addEntry('item.manufacturer.externalName_asc', 'Widget.itemProducerName_asc')
            ->addEntry('item.manufacturer.externalName_desc', 'Widget.itemProducerName_desc');

        if ($withRandomOption) {
            $list->addEntry('item.random', 'Widget.itemRandom');
        }

        return $list
            ->addEntry(
                'variation.position_asc',
                $sortBySales ? 'Widget.itemVariationTopseller_asc' : 'Widget.itemVariationPosition_asc'
            )
            ->addEntry(
                'variation.position_desc',
                $sortBySales ? 'Widget.itemVariationTopseller_desc' : 'Widget.itemVariationPosition_desc'
            );
    }
}
