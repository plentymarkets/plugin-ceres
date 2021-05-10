<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class AttributesPropertiesCharacteristicsFilterWidget extends FilterBaseWidget
{
    /** @inheritDoc */
    protected $allowedFacetTypes = ["dynamic"];

    /** @inheritDoc */
    protected $className = "attributes-properties-characteristics";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::AttributesPropertiesCharacteristicsFilterWidget')
                                ->withLabel('Widget.attributesPropertiesCharacteristicsFilterLabel')
                                ->withPreviewImageUrl('/images/widgets/attributes-properties-characteristics-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(700)
                                ->withSearchKeyWords([
                                    "filter", "attribut", "atrribute", "einstellung", "property", "properties"
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
