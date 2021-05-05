<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SelectedFilterWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Category.Filter.SelectedFilterWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::SelectedFilterWidget')
                                ->withLabel('Widget.selectedFilterWidgetLabel')
                                ->withPreviewImageUrl('/images/widgets/selected-filter.svg')
                                ->withType(WidgetTypes::CATEGORY_ITEM)
                                ->withCategory(WidgetTypes::CATEGORY_ITEM)
                                ->withPosition(600)
                                ->withSearchKeyWords([
                                    "filter", "active", "aktiviert", "aktiv"
                                ])
                                ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass()
                 ->withDefaultValue('none');

        $settings->createAppearance()
                 ->withDefaultValue('primary');

        $settings->createAlignment();

        $settings->createSpacing();

        return $settings->toArray();
    }
}
