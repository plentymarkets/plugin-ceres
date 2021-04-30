<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AvailabilityFilterWidget extends FilterBaseWidget
{
    /** @inheritDoc */
    protected $allowedFacetTypes = ["availability"];

    /** @inheritDoc */
    protected $className = "availability";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::AvailabilityFilterWidget')
                                ->withLabel('Widget.availabilityFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/availability-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(800)
                                ->withSearchKeyWords([
                                    "filter", "availability", "verfügbar", "verfügbarkeit"
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
