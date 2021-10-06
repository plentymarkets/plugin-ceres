<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class PriceFilterWidget extends FilterBaseWidget
{
    /** @inheritDoc */
    protected $allowedFacetTypes = ["price"];

    /** @inheritDoc */
    protected $className = "price";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::PriceFilterWidget')
                                ->withLabel('Widget.priceFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/price-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(900)
                                ->withSearchKeyWords([
                                    "filter", "preis", "price"
                                ])
                                ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        return parent::getSettings();
    }
}
