<?php

namespace Ceres\Widgets\Header;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Common\ImageBoxWidget;
use Ceres\Widgets\Helper\BaseWidget;
use IO\Helper\Utils;
use IO\Services\CategoryService;
use IO\Services\ItemSearch\Factories\Faker\CategoryTreeFaker;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Modules\Webshop\Contracts\ContactRepositoryContract;

class NavigationWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Header.NavigationWidget';
    
    /**
     * @inheritDoc
     */
    protected function getPreviewData($widgetSettings)
    {
        /** @var CategoryService $categoryService */
        $categoryService = pluginApp(CategoryService::class);

        /** @var CeresConfig $ceresConfig */
        $ceresConfig = pluginApp(CeresConfig::class);

        /** @var ContactRepositoryContract $contactRepository */
        $contactRepository = pluginApp(ContactRepositoryContract::class);

        $categories = $categoryService->getNavigationTree(
            $ceresConfig->header->showCategoryTypes,
            Utils::getLang(),
            $ceresConfig->header->menuLevels,
            $contactRepository->getContactClassId()
        );

        if (!count($categories)) {
            /** @var CategoryTreeFaker $categoryTreeFaker */
            $categoryTreeFaker = pluginApp(CategoryTreeFaker::class);
            $categories        = $categoryTreeFaker->fill([]);
        }

        return [
            'categories' => $categories
        ];
    }
    
    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::NavigationWidget')
            ->withLabel('Widget.navigationLabel')
            ->withPreviewImageUrl('/images/widgets/navigation.svg')
            ->withType(WidgetTypes::HEADER)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(0)
            ->toArray();
    }
    
    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createCheckbox('isFixed')
            ->withName('Widget.navigationIsFixedLabel')
            ->withDefaultValue(true);

        $settingsFactory->createSelect('navigationStyle')
            ->withName('Widget.navigationNavigationStyleLabel')
            ->withTooltip('Widget.navigationNavigationStyleTooltip')
            ->withDefaultValue('normal')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('normal', 'Widget.navigationNavigationStyleNormal')
                    ->addEntry('megaMenu', 'Widget.navigationNavigationStyleMegaMenu')
                    ->toArray()
            );

        $settingsFactory->createSelect('megaMenuLevels')
            ->withName('Widget.navigationMegaMenuLevelsLabel')
            ->withTooltip('Widget.navigationMegaMenuLevelsTooltip')
            ->withDefaultValue(2)
            ->withCondition("navigationStyle === 'megaMenu'")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(2, 'Widget.navigationMegaMenuLevels2')
                    ->addEntry(3, 'Widget.navigationMegaMenuLevels3')
                    ->addEntry(4, 'Widget.navigationMegaMenuLevels4')
                    ->toArray()
            );

        $maxItemsContainer = $settingsFactory->createVerticalContainer('megaMenuMaxItems')
            ->withName('Widget.navigationMegaMenuMaxItemsLabel')
            ->children;

        $maxItemsContainer->createNumber('stage1')
            ->withName('Widget.navigationMegaMenuMaxItemsStage1Label')
            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage1Tooltip')
            ->withDefaultValue(30);
            
        $maxItemsContainer->createNumber('stage2')
            ->withName('Widget.navigationMegaMenuMaxItemsStage2Label')
            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage2Tooltip')
            ->withDefaultValue(3)
            ->withCondition('navigationStyle === "megaMenu" && megaMenuLevels >= 3');

        $maxItemsContainer->createNumber('stage3')
            ->withName('Widget.navigationMegaMenuMaxItemsStage3Label')
            ->withTooltip('Widget.navigationMegaMenuMaxItemsStage3Tooltip')
            ->withDefaultValue(2)
            ->withCondition('navigationStyle === "megaMenu" && megaMenuLevels >= 4');

        $settingsFactory->createFile('companyLogoUrl')
            ->withName('Widget.navigationCompanyLogoUrlLabel')
            ->withTooltip('Widget.navigationCompanyLogoUrlTooltip')
            ->withDefaultValue('')
            ->withAllowedExtensions(array_merge(ImageBoxWidget::IMAGE_EXTENSIONS, ImageBoxWidget::MODERN_IMAGE_EXTENSIONS));

        $settingsFactory->createFile('fallbackImagePath')
            ->withCondition('!!companyLogoUrl && /.?(\.webp)(?:$|\?)/.test(companyLogoUrl)')
            ->withName('Widget.navigationFallbackImagePathLabel')
            ->withTooltip('Widget.navigationFallbackImagePathTooltip')
            ->withDefaultValue('')
            ->withAllowedExtensions(ImageBoxWidget::IMAGE_EXTENSIONS);

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
