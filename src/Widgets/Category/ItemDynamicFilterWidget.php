<?php

namespace Ceres\Widgets\Category;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\ItemSearch\Factories\Faker\FacetFaker;

class ItemDynamicFilterWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.ItemDynamicFilterWidget";

    protected function getPreviewData($widgetSettings)
    {
        /** @var FacetFaker $facetFaker */
        $facetFaker = pluginApp(FacetFaker::class);
        $facetResult = $facetFaker->fill([]);

        return ['facets' => $facetResult];
    }
}
