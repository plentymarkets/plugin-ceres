<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class BackgroundWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Common.BackgroundWidget';

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::BackgroundWidget')
            ->withLabel('Widget.backgroundLabel')
            ->withPreviewImageUrl('/images/widgets/background.svg')
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::IMAGE)
            ->withPosition(700)
            ->withSearchKeyWords([
                "hintergrund", "background",
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

        $settings->createCheckbox('fullWidth')
            ->withDefaultValue(true)
            ->withName('Widget.backgroundFullWidthLabel')
            ->withTooltip('Widget.backgroundFullWidthTooltip');

        $settings->createCheckbox('fullHeight')
            ->withDefaultValue(false)
            ->withName('Widget.backgroundFullHeightLabel')
            ->withTooltip('Widget.backgroundFullHeightTooltip');

        $settings->createCheckbox('hugeFont')
            ->withDefaultValue(false)
            ->withName('Widget.backgroundHugeFontLabel')
            ->withTooltip('Widget.backgroundHugeFontTooltip');

        $settings->createCheckbox('backgroundFixed')
            ->withDefaultValue(false)
            ->withName('Widget.backgroundFixedLabel')
            ->withTooltip('Widget.backgroundFixedTooltip');

        $this->createImageSettings($settings);

        $settings->createColorPalette();

        $settings->createColor('customColor')
            ->withCondition("colorPalette === 'custom'")
            ->withDefaultValue('#000000');

        $settings->createSlider('opacity')
            ->withDefaultValue(100)
            ->withName('Widget.backgroundOpacityLabel')
            ->withOption('inputInterval', 1)
            ->withOption('inputMax', 100);

        $settings->createHeight()
            ->withCondition("fullHeight !== true");

        $settings->createSpacing();

        return $settings->toArray();
    }

    /**
     * @param WidgetSettingsFactory $settings
     */
    private function createImageSettings($settings)
    {

        $settings->createCheckbox('lazyloadImage')
            ->withName('Widget.backgroundLazyloadLabel')
            ->withTooltip('Widget.backgroundLazyloadTooltip')
            ->withCondition("!preloadImage");

        $settings->createCheckbox('preloadImage')
            ->withName('Widget.preloadImageLabel')
            ->withTooltip('Widget.preloadImageTooltip')
            ->withCondition("!lazyloadImage");

        $settings->createSelect('sourceType')
            ->withDefaultValue('none')
            ->withName('Widget.backgroundSourceTypeLabel')
            ->withTooltip('Widget.backgroundSourceTypeTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('none', 'Widget.backgroundSourceTypeNone')
                    ->addEntry('custom-image', 'Widget.backgroundSourceTypeCustomImage')
                    ->addEntry('category-image1', 'Widget.backgroundSourceTypeCategoryImage1')
                    ->addEntry('category-image2', 'Widget.backgroundSourceTypeCategoryImage2')
                    ->toArray()
            );

        $settings->createFile('customImagePath')
            ->withCondition("sourceType === 'custom-image'")
            ->withName('Widget.backgroundImageSourceLabel')
            ->withTooltip('Widget.backgroundImageSourceTooltip')
            ->withAllowedExtensions(array_merge(ImageBoxWidget::IMAGE_EXTENSIONS, ImageBoxWidget::MODERN_IMAGE_EXTENSIONS));


        $settings->createFile('fallbackImagePath')
            ->withCondition("sourceType === 'custom-image' && /.?(\.webp)(?:$|\?)/.test(customImagePath)")
            ->withName('Widget.backgroundFallbackImageSourceLabel')
            ->withTooltip('Widget.backgroundFallbackImageSourceTooltip')
            ->withAllowedExtensions(ImageBoxWidget::IMAGE_EXTENSIONS);

        $settings->createSelect('backgroundSize')
            ->withCondition("sourceType !== 'none'")
            ->withDefaultValue('bg-cover')
            ->withName('Widget.backgroundSizeLabel')
            ->withTooltip('Widget.backgroundSizeTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('bg-cover', 'Widget.backgroundSizeCover')
                    ->addEntry('bg-contain', 'Widget.backgroundSizeContain')
                    ->addEntry('bg-auto', 'Widget.backgroundSizeAuto')
                    ->toArray()
            );

        $settings->createCheckbox('backgroundFixed')
            ->withCondition("sourceType !== 'none'")
            ->withDefaultValue(false)
            ->withName('Widget.backgroundFixedLabel')
            ->withTooltip('Widget.backgroundFixedTooltip');

        $settings->createCheckbox('backgroundRepeat')
            ->withCondition("sourceType !== 'none' && backgroundSize !== 'bg-cover'")
            ->withDefaultValue(false)
            ->withName('Widget.backgroundRepeatLabel')
            ->withTooltip('Widget.backgroundRepeatTooltip');
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $stylingClasses = '';

        if (array_key_exists(
            'backgroundFixed',
            $widgetSettings
        ) && $widgetSettings['backgroundFixed']['mobile'] == false) {
            $stylingClasses .= 'bg-scroll ';
        }

        if (array_key_exists(
            'backgroundRepeat',
            $widgetSettings
        ) && $widgetSettings['backgroundRepeat']['mobile'] == true && $widgetSettings['backgroundSize']['mobile'] !== 'bg-cover') {
            $stylingClasses .= 'bg-repeat ';
        }

        if (array_key_exists('backgroundSize', $widgetSettings) && $widgetSettings['backgroundSize']['mobile']) {
            $stylingClasses .= $widgetSettings['backgroundSize']['mobile'];
        }

        return [
            'stylingClasses' => $stylingClasses
        ];
    }
}
