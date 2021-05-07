<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ManufacturerFilterWidget extends FilterBaseWidget
{
    /** @inheritDoc */
    protected $allowedFacetTypes = ["producer"];

    /** @inheritDoc */
    protected $className = "manufacturer";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ManufacturerFilterWidget')
                                ->withLabel('Widget.manufacturerFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/manufacturer-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(1100)
                                ->withSearchKeyWords([
                                    "filter", "hersteller", "manufacturer"
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
