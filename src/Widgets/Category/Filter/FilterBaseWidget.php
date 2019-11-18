<?php

namespace Ceres\Widgets\Category\Filter;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\ItemSearch\Factories\Faker\FacetFaker;

class FilterBaseWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Category.Filter.FilterBaseWidget";

    protected $allowedFacetTypes = [];

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        return [ "allowedFacetTypes" => $this->allowedFacetTypes ];
    }

    /**
     * @inheritdoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var FacetFaker $facetFaker */
        $facetFaker = pluginApp(FacetFaker::class);
        $facetResult = $facetFaker->fill([]);

        return [ "facets" => $facetResult ];
    }
}
