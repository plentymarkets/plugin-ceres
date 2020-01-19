<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use IO\Extensions\Filters\PatternFilter;
use IO\Services\CategoryService;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Modules\Category\Models\Category;
use Plenty\Plugin\Translation\Translator;

class DefaultFooterPreset implements ContentPreset
{
    /** @var PresetHelper $preset */
    private $preset;

    /** @var CeresConfig $config */
    private $config;

    /** @var PatternFilter $patternFilter */
    private $patternFilter;

    /** @var CategoryService $categoryService */
    private $categoryService;

    /** @var Translator $translator */
    private $translator;

    private $gridDropzoneNames = [
        1 => "first",
        2 => "second",
        3 => "third",
        4 => "fourth"
    ];

    /**
     * Get the widget configurations of the presets to be assigned to the created content.
     *
     * @return mixed
     */
    public function getWidgets()
    {
        $this->config = pluginApp(CeresConfig::class);
        $this->preset = pluginApp(PresetHelper::class);
        $this->patternFilter = pluginApp(PatternFilter::class);
        $this->categoryService = pluginApp(CategoryService::class);
        $this->translator = pluginApp(Translator::class);

        $this->createListWidget();
        $this->createSeparatorWidget();
        $this->createLinkListWidget();
        $this->createLegalInformationWidget();
        $this->createTextWidget();
        $this->createCookieBar();

        return $this->preset->toArray();
    }

    private function createListWidget()
    {
        $numberOfFeatures = $this->config->footer->numberOfFeatures;

        $listGridPreset = null;

        if ($numberOfFeatures === 1)
        {
            $listGridPreset = $this->preset->createWidget("Ceres::ThreeColumnWidget")
                ->withSetting("layout", "oneToOneToOne");
        }
        else if ($numberOfFeatures === 2)
        {
            $listGridPreset = $this->preset->createWidget("Ceres::TwoColumnWidget")
                ->withSetting("layout", "oneToOne");
        }
        else if ($numberOfFeatures === 3)
        {
            $listGridPreset = $this->preset->createWidget("Ceres::ThreeColumnWidget")
                ->withSetting("layout", "oneToOneToOne");
        }


        if ($listGridPreset !== null)
        {
            for ($i = 1; $i <= $numberOfFeatures && $i <= 3; $i++)
            {
                $storeFeatureTranslation = $this->translator->trans("Ceres::Template.footerStoreFeature" . $i);
                $listGridPreset
                    ->createChild($this->gridDropzoneNames[$i], "Ceres::ListWidget")
                    ->withSetting("icon", "fa-check")
                    ->withSetting("entries", [
                        ["text" => $storeFeatureTranslation, "url" => ""]
                    ])
                    ->withSetting("centered", true);
            }
        }
    }

    private function createSeparatorWidget()
    {
        $this->preset->createWidget("Ceres::SeparatorWidget");
    }

    private function createLinkListWidget()
    {
        $numberOfCols = $this->config->footer->numberOfCols;

        $configuredCategories = [
            1 => $this->config->footer->col1Categories,
            2 => $this->config->footer->col2Categories,
            3 => $this->config->footer->col3Categories
        ];

        $linkListGridPreset = $this->preset->createWidget("Ceres::FourColumnWidget");

        for ($i = 1; $i <= $numberOfCols && $i <= 3; $i++)
        {
            $columnTitleTranslation = $this->translator->trans("Ceres::Template.footerColumnTitle" . $i);
            $linkListPreset = $linkListGridPreset->createChild($this->gridDropzoneNames[$i], "Ceres::LinkListWidget")
                ->withSetting("title", $columnTitleTranslation)
                ->withSetting("icon", "none");

            $categoryIds = $this->patternFilter->findPattern($configuredCategories[$i], "[0-9]+");
            $entries = [];
            foreach ($categoryIds as $key=>$categoryId)
            {
                $category = $this->categoryService->get($categoryId);

                if ($category instanceof Category && $category->details[0] !== null)
                {
                    $categoryName = $category->details[0]->name;
                    $categoryUrl = $this->categoryService->getURL($category);

                    $entries[] = [
                        "text" => $categoryName,
                        "url"  => $categoryUrl
                    ];
                }
            }

            $linkListPreset->withSetting("entries", $entries);            
            $linkListPreset->withSetting("centered", false);
        }
    }

    private function createLegalInformationWidget()
    {
        $this->preset->createWidget("Ceres::LegalInformationWidget")
            ->withSetting("showCancellationRights", true)
            ->withSetting("showLegalDisclosure", true)
            ->withSetting("showPrivacyPolicy", true)
            ->withSetting("showGtc", true)
            ->withSetting("cancellationFormContainer.showCancellationForm", true)
            ->withSetting("cancellationFormContainer.useCancellationPdfUpload", false)
            ->withSetting("cancellationFormContainer.cancellationPdfPath", "");
    }

    private function createTextWidget()
    {
        $defaultText = "";
        $defaultText .= "<div class=\"copyright text-center\">";
        $defaultText .=     "<a rel=\"nofollow\" href=\"https://www.plentymarkets.eu\">";
        $defaultText .=         "<img alt=\"Plentymarkets GmbH Logo\" class=\"svg plenty-brand\" src=\"{{ plugin_path('Ceres') }}/images/plentymarkets-logo.svg\" rel=\"nofollow\">";
        $defaultText .=     "</a>";
        $defaultText .=     "<br>";
        $defaultText .=     "<small>&copy; Copyright {{ \"now\" | date(\"Y\") }} | {{ trans(\"Ceres::Template.footerAllRightsReserved\") }}</small>";
        $defaultText .= "</div>";

        $this->preset->createWidget("Ceres::CodeWidget")
            ->withSetting("appearance", "none")
            ->withSetting("text", $defaultText);
    }

    private function createCookieBar()
    {
        $this->preset->createWidget("Ceres::CookieBarWidget")
            ->withSetting("customClass", "")
            ->withSetting("appearance", "primary");
    }
}