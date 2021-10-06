<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class CategoryFilterWidget extends FilterBaseWidget
{
    /** @inheritDoc */
    protected $allowedFacetTypes = ["category"];

    /** @inheritDoc */
    protected $className = "category";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::CategoryFilterWidget')
                                ->withLabel('Widget.categoryFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/category-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(1000)
                                ->withSearchKeyWords([
                                    "filter", "kategorie", "category"
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
