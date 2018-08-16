<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use IO\Extensions\Filters\PatternFilter;
use IO\Services\CategoryService;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Application;

class DefaultFooterPreset implements ContentPreset
{
    /** @var CeresConfig */
    public $config;

    /**
     * Get the widget configurations of the presets to be assigned to the created content.
     *
     * @return mixed
     */
    public function getWidgets()
    {
        /** @var CeresConfig $config */
        $config = pluginApp(CeresConfig::class);
        $this->config = pluginApp(CeresConfig::class);

        /** @var PresetHelper $preset */
        $preset = pluginApp(PresetHelper::class);

        /** @var PatternFilter $patternFilter */
        $patternFilter = pluginApp(PatternFilter::class);

        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);

        $gridDropzoneNames = [
            1 => "first",
            2 => "second",
            3 => "third",
            4 => "fourth"
        ];

        /**
         * List
         */
        $numberOfFeatures = $config->footer->numberOfFeatures;
        $listGridPreset = null;

        if ($numberOfFeatures === 1)
        {
            // no grid
        }
        else if ($numberOfFeatures === 2)
        {
            // two column grid
            $listGridPreset = $preset->createWidget("Ceres::TwoColumnWidget")
                ->withSetting("layout", "oneToOne")
                ->withSetting("appearance", "primary");
        }
        else if ($numberOfFeatures === 3)
        {
            // three column grid
            $listGridPreset = $preset->createWidget("Ceres::ThreeColumnWidget")
                ->withSetting("layout", "oneToOneToOne")
                ->withSetting("appearance", "primary");
        }

        for ($i = 1; $i <= $numberOfFeatures && $i <= 3; $i++)
        {
            $listGridPreset->withChild($gridDropzoneNames[$i],
                $preset->createWidget("Ceres::ListWidget")
                    ->withSetting("icon", "fa-check")
                    ->withSetting("text1", "{{ trans('Ceres::Template.footerStoreFeature" . $i . "') }}"));
        }

        /**
         * Separator
         */
        $preset->createWidget("Ceres::SeparatorWidget");

        /**
         * Link list
         */
        $numberOfCols = $config->footer->numberOfCols;
        $linkListPresets = [];

        for( $i = 1; $i <= $numberOfCols; $i++ )
        {
            $configuredCategories = $config->footer["col" . $i . "Categories"];
            $footerCategories = $patternFilter->findPattern($configuredCategories, "[0-9]+");

            $linkListPreset = $preset->createWidget("Ceres::LinkListWidget")
                ->withSetting("title", "{{ trans('Ceres::Template.footerColumnTitle" . $i . "') }}")
                ->withSetting("icon", "none");

            for ($o = 1; $o <= count($footerCategories) && $o <= 5; $o++)
            {
                $categoryId = $footerCategories[$o - 1];
                $category = $categoryService->get($categoryId);
                $categoryName = $category["details"][0]["name"];
                $categoryURL = $categoryService->getURL($category);

                $linkListPreset->withSetting("entry" . $o . ".name", $categoryName);
                $linkListPreset->withSetting("entry" . $o . ".url", $categoryURL);
            }

            $linkListPresets[] = $linkListPreset;
        }

        $linkListGridPreset = $preset->createWidget("Ceres::ThreeColumnWidget")
            ->withSetting("layout", "oneToOneToOne")
            ->withSetting("appearance", "none");

        // TODO: set the preset into the correct dropzone
        foreach ($linkListPresets as $linkListPreset)
        {
            $linkListGridPreset->withChild("first", $linkListPreset);
        }

        /**
         * Legal information
         */
        $preset->createWidget("Ceres::LegalInformationWidget")
            ->withSetting("showCancellationRights", true)
            ->withSetting("showLegalDisclosure", true)
            ->withSetting("showPrivacyPolicy", true)
            ->withSetting("showGtc", true)
            ->withSetting("cancellationFormContainer.showCancellationForm", true)
            ->withSetting("cancellationFormContainer.useCancellationPdfUpload", false)
            ->withSetting("cancellationFormContainer.cancellationPdfPath", "");

        /**
         * Textwidget for plentylogo
         */

        $defaultText =  <<<'EOD'
            <div class="copyright text-xs-center m-y-1">
                <a rel="nofollow" href="https://www.plentymarkets.eu">
                    <img alt="Plentymarkets GmbH Logo" class="svg plenty-brand" src="{{ plugin_path('Ceres') }}/images/plentymarkets-logo.svg" rel="nofollow" crossorigin="anonymous">
                </a>
                <br>
                <small>&copy; Copyright {{ "now" | date("Y") }} | {{ trans("Ceres::Template.footerAllRightsReserved") }}</small>
            </div>
EOD;


        $preset->createWidget("Ceres::TextWidget")
            ->withSetting("appearance", "none")
            ->withSetting("text", $defaultText);

        return $preset->toArray();
    }

    private function getListWidget()
    {

    }
}
