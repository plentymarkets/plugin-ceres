<?php

namespace Ceres\Widgets\Helper\Factories;

use Ceres\Widgets\Helper\Factories\Settings\AlignmentSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\AppearanceSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ButtonSizeSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ColorPaletteSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CustomClassSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\EditorSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\HeightSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\IconSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ManufacturerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SpacingSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\UUIDSettingFactory;
use Plenty\Modules\ShopBuilder\Contracts\DynamicWidget;
use Plenty\Modules\ShopBuilder\Factories\Settings\BaseSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\CategorySettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\CheckboxGroupSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\CheckboxSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\DateSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\DoubleSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\FileSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\RadioGroupSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\SelectSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\SliderSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\SuggestionSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\TextareaSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\TextSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\Settings\UrlSettingFactory;
use Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory as CoreWidgetSettingsFactory;

/**
 * Class WidgetSettingsFactory
 *
 * Factory to create different types of settings for a widget.
 *
 * @package Ceres\Widgets\Helper\Factories
 * @deprecated since 5.0.23
 * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory
 */
class WidgetSettingsFactory
{
    /**
     * New internal factory to be used instead.
     * Methods will be mapped to this instance.
     *
     * @var CoreWidgetSettingsFactory
     */
    protected $coreFactory;

    /**
     * Create a new factory instance and initialize values from given widget class.
     *
     * @param string $parentWidgetClass Class name of a widget to inherit settings from
     * @return WidgetSettingsFactory
     * @deprecated since 5.0.23
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::inherit()
     */
    public static function inherit($parentWidgetClass)
    {
        $parentSettings = [];
        $parentWidget = pluginApp($parentWidgetClass);
        if ($parentWidget instanceof DynamicWidget) {
            $parentSettings = $parentWidget->getSettings();
        }
        return self::create($parentSettings);
    }

    /**
     * Create a new factory instance with initial values.
     *
     * @param array $data Raw data describing some settings. This will be the same when calling toArray() on a factory instance.
     * @return WidgetSettingsFactory
     * @deprecated since 5.0.23
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::create()
     */
    public static function create($data = [])
    {
        /** @var WidgetSettingsFactory $instance */
        $instance = pluginApp(WidgetSettingsFactory::class);
        $instance->coreFactory = CoreWidgetSettingsFactory::create($data);
        return $instance;
    }

    public function __construct()
    {
        $this->coreFactory = pluginApp(CoreWidgetSettingsFactory::class);
    }

    /**
     * Create a generic widget settings entry.
     *
     * @param string $key The key of the new settings entry. If key already exists, previous entry will be overridden.
     *
     * @return BaseSettingFactory
     * @deprecated since 5.0.23
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     */
    public function createSetting($key)
    {
        return $this->coreFactory->createSetting($key);
    }

    /**
     * Create a container entry which may contain nested settings.
     * Values of nested settings will be grouped into an object for the key of this setting.
     *
     * @param string $key The key of the container setting.
     * @return ContainerSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\ContainerSettingFactory
     */
    public function createContainer($key)
    {
        return $this->coreFactory->createSetting($key, ContainerSettingFactory::class);
    }

    /**
     * Create a vertical container to group nested settings below to each other.
     * @param string $key The key of the container.
     * @return ContainerSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\ContainerSettingFactory
     */
    public function createVerticalContainer($key)
    {
        return $this->coreFactory
            ->createSetting($key, ContainerSettingFactory::class)
            ->withType('vertical');
    }

    /**
     * Create a horizontal container to group nested settings next to each other.
     * @param string $key The key of the container.
     * @return ContainerSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\ContainerSettingFactory
     */
    public function createHorizontalContainer($key)
    {
        return $this->coreFactory
            ->createSetting($key, ContainerSettingFactory::class)
            ->withType('horizontal');
    }

    /**
     * Create a text input setting.
     *
     * @param string $key The key of the setting.
     * @return TextSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\TextSettingFactory
     */
    public function createText($key)
    {
        return $this->coreFactory->createSetting($key, TextSettingFactory::class);
    }

    /**
     * Create a checkbox setting.
     *
     * @param string $key The key of the setting.
     * @return CheckboxSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\CheckboxSettingFactory
     */
    public function createCheckbox($key)
    {
        return $this->coreFactory->createSetting($key, CheckboxSettingFactory::class);
    }

    /**
     * Create a color setting.
     *
     * @param string $key The key of the setting.
     * @return ColorPaletteSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\ColorPaletteSettingFactory
     */
    public function createColorPalette($key = 'colorPalette')
    {
        return $this->coreFactory->createSetting($key, ColorPaletteSettingFactory::class);
    }

    /**
     * Create a date input setting.
     *
     * @param string $key The key of the setting.
     * @return DateSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\DateSettingFactory
     */
    public function createDate($key)
    {
        return $this->coreFactory->createSetting($key, DateSettingFactory::class);
    }

    /**
     * Create a file picker setting.
     *
     * @param string $key The key of the setting.
     * @return FileSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\FileSettingFactory
     */
    public function createFile($key)
    {
        return $this->coreFactory->createSetting($key, FileSettingFactory::class);
    }

    /**
     * Create a textarea input setting.
     *
     * @param string $key The key of the setting.
     * @return TextareaSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\TextareaSettingFactory
     */
    public function createTextarea($key)
    {
        return $this->coreFactory->createSetting($key, TextareaSettingFactory::class);
    }

    /**
     * Create a number input setting.
     *
     * @param string $key The key of the setting.
     * @return BaseSettingFactory
     * @deprecated since 5.0.23
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     */
    public function createNumber($key)
    {
        return $this->coreFactory
            ->createSetting($key)
            ->withType('number');
    }

    /**
     * Create a double input setting.
     *
     * @param string $key The key of the setting.
     * @return DoubleSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\DoubleSettingFactory
     */
    public function createDouble($key)
    {
        return $this->coreFactory->createSetting($key, DoubleSettingFactory::class);
    }

    /**
     * Create a dropdown setting.
     *
     * @param string $key The key of the setting.
     * @return SelectSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\SelectSettingFactory
     */
    public function createSelect($key)
    {
        return $this->coreFactory->createSetting($key, SelectSettingFactory::class);
    }

    /**
     * Create a dropdown with suggestions.
     *
     * @param string $key The key of the setting.
     * @return SuggestionSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\SuggestionSettingFactory
     */
    public function createSuggestion($key)
    {
        return $this->coreFactory->createSetting($key, SuggestionSettingFactory::class);
    }

    /**
     * Create a category picker setting.
     *
     * @param string $key The key of the setting.
     * @return CategorySettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\CategorySettingFactory
     */
    public function createCategory($key)
    {
        return $this->coreFactory->createSetting($key, CategorySettingFactory::class);
    }

    /**
     * Create a color picker setting.
     *
     * @param string $key The key of the setting.
     * @return BaseSettingFactory
     * @deprecated since 5.0.23
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     */
    public function createColor($key)
    {
        return $this->coreFactory
            ->createSetting($key)
            ->withType('color');
    }

    /**
     * Create a slider setting.
     *
     * @param string $key The key of the setting.
     * @return SliderSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\SliderSettingFactory
     */
    public function createSlider($key)
    {
        return $this->coreFactory->createSetting($key, SliderSettingFactory::class);
    }

    /**
     * Create a checkbox group setting.
     *
     * @param string $key The key of the setting.
     * @return CheckboxGroupSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\CheckboxGroupSettingFactory
     */
    public function createCheckboxGroup($key)
    {
        return $this->coreFactory->createSetting($key, CheckboxGroupSettingFactory::class);
    }

    /**
     * Create a checkbox group setting.
     *
     * @param string $key The key of the setting.
     * @return RadioGroupSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\RadioGroupSettingFactory
     */
    public function createRadioGroup($key)
    {
        return $this->coreFactory->createSetting($key, RadioGroupSettingFactory::class);
    }

    /**
     * Create a url picker.
     *
     * @param string $key The key of the setting.
     * @return UrlSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Plenty\Modules\ShopBuilder\Factories\Settings\UrlSettingFactory
     */
    public function createUrl($key)
    {
        return $this->coreFactory->createSetting($key, UrlSettingFactory::class);
    }

    /**
     * Create a note editor.
     *
     * @param string $key The key of the setting.
     * @return EditorSettingFactory
     * @deprecated since 5.0.21. Use a textarea setting or inline editable areas in you widget template instead.
     */
    public function createNoteEditor($key)
    {
        return $this->coreFactory
            ->createSetting($key, EditorSettingFactory::class)
            ->withType('noteEditor');
    }

    /**
     * Create a code editor.
     *
     * @param string $key The key of the setting.
     * @return EditorSettingFactory
     * @deprecated since 5.0.21. Use a textarea setting or inline code editor instead.
     */
    public function createCodeEditor($key)
    {
        return $this->coreFactory
            ->createSetting($key, EditorSettingFactory::class)
            ->withType('codeEditor');
    }

    /**
     * Create an UUID setting
     *
     * @param string $key The key of the setting.
     * @return UUIDSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\UUIDSettingFactory
     */
    public function createUUID($key)
    {
        return $this->coreFactory->createSetting($key, UUIDSettingFactory::class);
    }

    /**
     * Create a manufacturer picker.
     *
     * @param string $key The key of the setting.
     * @return ManufacturerSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\ManufacturerSettingFactory
     */
    public function createManufacturer($key)
    {
        return $this->coreFactory->createSetting($key, ManufacturerSettingFactory::class);
    }

    /**
     * Create a text input for a custom css class.
     *
     * @param string $key The key of the setting.
     * @return CustomClassSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\CustomClassSettingFactory
     */
    public function createCustomClass($key = 'customClass')
    {
        return $this->coreFactory->createSetting($key, CustomClassSettingFactory::class);
    }

    /**
     * Create a dropdown with appearance colors.
     *
     * @param bool $optional If true, a 'none' value is added to the value list.
     * @param string $key The key of the setting.
     * @return AppearanceSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\AppearanceSettingFactory
     */
    public function createAppearance($optional = false, $key = 'appearance')
    {
        return $this->coreFactory->createSetting(
            $key,
            AppearanceSettingFactory::class,
            [
                'optional' => $optional
            ]
        );
    }

    /**
     * Create a dropdown with icons.
     *
     * @param string $key The key of the setting.
     * @return IconSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\IconSettingFactory
     */
    public function createIcon($key = 'icon')
    {
        return $this->coreFactory->createSetting($key, IconSettingFactory::class);
    }

    /**
     * Create containers with spacing settings.
     *
     * @param bool $usePadding Set true to create a container for paddings.
     * @param bool $useMargin Set true to create a container for margins.
     * @param string $key The key of the setting.
     * @return SpacingSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\SpacingSettingFactory
     */
    public function createSpacing($usePadding = true, $useMargin = true, $key = 'spacing')
    {
        return $this->coreFactory->createSetting(
            $key,
            SpacingSettingFactory::class,
            [
                'usePadding' => $usePadding,
                'useMargin' => $useMargin
            ]
        );
    }

    /**
     * Create an input for the height.
     *
     * @param string $key The key of the setting.
     * @return HeightSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\HeightSettingFactory
     */
    public function createHeight($key = 'height')
    {
        return $this->coreFactory->createSetting($key, HeightSettingFactory::class);
    }

    /**
     * Create a dropdown for the button size.
     *
     * @param string $key The key of the setting.
     * @return ButtonSizeSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\ButtonSizeSettingFactory
     */
    public function createButtonSize($key = 'buttonSize')
    {
        return $this->coreFactory->createSetting($key, ButtonSizeSettingFactory::class);
    }

    /**
     * Create a button group with alignment selections.
     *
     * @param string $key The key of the setting.
     * @return AlignmentSettingFactory
     * @deprecated since 5.0.23 Use createSetting() and pass required factory class.
     * @see \Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory::createSetting()
     * @see \Ceres\Widgets\Helper\Factories\Settings\AlignmentSettingFactory
     */
    public function createAlignment($key = 'alignment')
    {
        return $this->coreFactory->createSetting($key, AlignmentSettingFactory::class);
    }

    /**
     * Create data array for configured settings.
     * This array can be passed to terra-form elements to be rendered.
     *
     * @return array
     */
    public function toArray()
    {
        return $this->coreFactory->toArray();
    }

    /**
     * Set a settings key to insert new settings after.
     * The key might be a path to nested setting entries.
     * If so, the nested factory instance will be returned.
     * By default new settings will be appended at the end.
     *
     * @param $key
     * @return $this
     */
    public function withPointer($key)
    {
        $this->coreFactory->withPointer($key);
        return $this;
    }
}
