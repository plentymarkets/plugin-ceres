<?php

namespace Ceres\Widgets\Navigation;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use IO\Helper\Utils;
use IO\Services\CategoryService;
use IO\Services\ItemSearch\Factories\Faker\CategoryTreeFaker;
use Plenty\Modules\Webshop\Contracts\ContactRepositoryContract;

class NavigationTreeWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Navigation.NavigationTreeWidget';

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::NavigationTreeWidget')
                                ->withLabel('Widget.navigationTreeLabel')
                                ->withPreviewImageUrl('/images/widgets/navigation-tree.svg')
                                ->withType(WidgetTypes::DEFAULT)
                                ->withCategory(WidgetTypes::NAVIGATION)
                                ->withPosition(0)
                                ->withSearchKeyWords([
                                    "navigation", "baum", "tree", "navigationsbaum"
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

        $settings->createCustomClass();

        $settings->createAppearance(true);

        $settings->createCheckbox('expandableChildren')
                 ->withDefaultValue(true)
                 ->withName('Widget.navigationTreeExpandableChildrenLabel');

        $settings->createCheckbox('showItemCount')
                 ->withDefaultValue(true)
                 ->withName('Widget.navigationTreeShowItemCount');

        $container = $settings->createVerticalContainer('customEntries')
                              ->withList(1)
                              ->withName('Widget.navigationTreeCustomEntries');

        $container->children->createText('text')
                            ->withDefaultValue('')
                            ->withName('Widget.navigationTreeCustomEntriesLabel')
                            ->withTooltip('Widget.navigationTreeCustomEntriesTooltip');

        $container->children->createUrl('url')
                            ->withName('Widget.navigationTreeCustomEntriesUrlLabel')
                            ->withTooltip('Widget.navigationTreeCustomEntriesUrlTooltip');

        $container->children->createText('position')
                            ->withName('Widget.navigationTreeCustomEntriesPositionLabel')
                            ->withTooltip('Widget.navigationTreeCustomEntriesPositionTooltip');

        $spacingContainer = $settings->createVerticalContainer('spacing')
                                     ->withName('Widget.widgetSpacing');

        $spacingContainer->children->createCheckbox('customPadding')
                                   ->withName('Widget.widgetCustomPadding');

        $spacingContainer->children->createSetting('padding')
                                   ->withType('spacing')
                                   ->withCondition('!!spacing.customPadding')
                                   ->withOption(
                                       'units',
                                       [
                                           'px',
                                           'rem'
                                       ]
                                   )
                                   ->withOption('direction', 'vertical');

        $spacingContainer->children->createCheckbox('customMargin')
                                   ->withName('Widget.widgetCustomMargin');

        $spacingContainer->children->createSetting('margin')
                                   ->withType('spacing')
                                   ->withCondition('!!spacing.customMargin')
                                   ->withOption(
                                       'units',
                                       [
                                           'px',
                                           'rem'
                                       ]
                                   )
                                   ->withOption('direction', 'all');

        return $settings->toArray();
    }

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
    public function getTemplateData($widgetSettings, $isPreview)
    {
        $customEntries = $widgetSettings['customEntries']['mobile'];

        usort(
            $customEntries,
            function ($entryA, $entryB) {
                return $entryA['position'] - $entryB['position'];
            }
        );

        return ['customEntries' => $customEntries];
    }
}
