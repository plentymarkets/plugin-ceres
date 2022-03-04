<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ImageBoxWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = 'Ceres::Widgets.Common.ImageBoxWidget';

    /** @const string[] IMAGE_EXTENSION */
    const IMAGE_EXTENSIONS = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'svg',
        'apng'
    ];

    /** @const string[] MODERN_IMAGE_EXTENSIONS */
    const MODERN_IMAGE_EXTENSIONS = [
        'webp'
    ];

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make('Ceres::ImageBoxWidget')
            ->withLabel('Widget.imageBoxLabel')
            ->withPreviewImageUrl('/images/widgets/image-box.svg')
            ->withType(WidgetTypes::STATIC)
            ->withCategory(WidgetCategories::IMAGE)
            ->withPosition(600)
            ->withSearchKeyWords([
                "foto", "picture", "bild", "image", "einzelbild"
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
        $settings->createAppearance();
        $settings->createSelect('aspectRatio')
            ->withDefaultValue('auto')
            ->withName('Widget.imageBoxAspectRatioLabel')
            ->withTooltip('Widget.imageBoxAspectRatioTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('retain', 'Widget.imageBoxRetainAspectRatio')
                    ->addEntry('auto', 'Widget.imageBoxAspectRatioAuto')
                    ->addEntry('3-1', 'Widget.imageBoxAspectRatioThreeToOne')
                    ->addEntry('2-1', 'Widget.imageBoxAspectRatioTwoToOne')
                    ->addEntry('3-2', 'Widget.imageBoxAspectRatioThreeToTwo')
                    ->addEntry('1-1', 'Widget.imageBoxAspectRatioOneToOne')
                    ->addEntry('2-3', 'Widget.imageBoxAspectRatioTwoToThree')
                    ->addEntry('1-2', 'Widget.imageBoxAspectRatioOneToTwo')
                    ->addEntry('1-3', 'Widget.imageBoxAspectRatioOneToThree')
                    ->toArray()
            );

        $settings->createSelect('style')
            ->withDefaultValue('block-caption')
            ->withName('Widget.imageBoxStyleLabel')
            ->withTooltip('Widget.imageBoxStyleTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('block-caption', 'Widget.imageBoxStyleBlockCaption')
                    ->addEntry('inline-caption', 'Widget.imageBoxStyleInlineCaption')
                    ->addEntry('fullwidth', 'Widget.imageBoxStyleFullwidth')
                    ->addEntry('no-caption', 'Widget.imageBoxStyleNoCaption')
                    ->toArray()
            );

        $settings->createSelect('imageSize')
            ->withCondition("aspectRatio !== 'retain'")
            ->withDefaultValue('cover')
            ->withName('Widget.imageBoxImageSizeLabel')
            ->withTooltip('Widget.imageBoxImageSizeTooltip')
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry('cover', 'Widget.imageBoxImageSizeCover')
                    ->addEntry('contain', 'Widget.imageBoxImageSizeContain')
                    ->toArray()
            );

        $settings->createUrl('url')
            ->withName('Widget.imageBoxUrlLabel');

        $settings->createCheckbox('customCaption')
            ->withCondition("style !== 'no-caption'")
            ->withName('Widget.imageBoxCustomCaption');

        $settings->createFile('customImagePath')
            ->withDefaultValue('')
            ->withName('Widget.imageBoxCustomImagePathLabel')
            ->withTooltip('Widget.imageBoxCustomImagePathTooltip')
            ->withAllowedExtensions(array_merge(self::IMAGE_EXTENSIONS, self::MODERN_IMAGE_EXTENSIONS));

        $settings->createFile('fallbackImagePath')
            ->withDefaultValue('')
            ->withName('Widget.imageBoxFallbackImagePathLabel')
            ->withTooltip('Widget.imageBoxFallbackImagePathTooltip')
            ->withCondition('!!customImagePath && /.?(\.webp)(?:$|\?)/.test(customImagePath)')
            ->withAllowedExtensions(self::IMAGE_EXTENSIONS);

        $settings->createCheckbox('lazyLoading')
            ->withName('Widget.imageBoxLazyLoadingName')
            ->withTooltip('Widget.imageBoxLazyLoadingTooltip')
            ->withCondition("!preloadImage")
            ->withDefaultValue(true);

        $settings->createCheckbox('preloadImage')
            ->withName('Widget.preloadImageLabel')
            ->withTooltip('Widget.preloadImageTooltip')
            ->withCondition("!lazyLoading");

        $settings->createCheckbox('zoomImage')
            ->withName('Widget.zoomImageLabel')
            ->withTooltip('Widget.zoomImageTooltip')
            ->withDefaultValue(false);

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $urlType = '';
        $urlValue = '';

        if (array_key_exists('url', $widgetSettings) && $widgetSettings['url']['value']['mobile']) {
            $urlType = $widgetSettings['url']['type']['mobile'];
            $urlValue = $widgetSettings['url']['value']['mobile'];
        } else {
            if ($widgetSettings['categoryId']['mobile']) {
                $urlType = 'category';
                $urlValue = $widgetSettings['categoryId']['mobile'];
            } else {
                $urlType = 'item';
                $urlValue = $widgetSettings['variationId']['mobile'];
            }
        }

        return [
            'urlType' => $urlType,
            'urlValue' => $urlValue
        ];
    }
}
