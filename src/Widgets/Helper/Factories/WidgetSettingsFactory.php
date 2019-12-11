<?php

namespace Ceres\Widgets\Helper\Factories;

use Ceres\Widgets\Helper\Factories\Settings\AlignmentSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CategorySettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CheckboxGroupSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CheckboxSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ColorPaletteSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\DateSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\DoubleSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\EditorSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\FileSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\AppearanceSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CustomClassSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\IconSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SpacingSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ButtonSizeSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\HeightSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ManufacturerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\RadioGroupSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SelectSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SliderSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SuggestionSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextareaSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\UUIDSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\UrlSettingFactory;
use Plenty\Modules\ShopBuilder\Contracts\DynamicWidget;

class WidgetSettingsFactory
{
    private $settings = [];
    private $pointer = null;
    
    /**
     * Create a new factory instance and initialize values from given widget class.
     *
     * @param string $parentWidgetClass
     * @return WidgetSettingsFactory
     */
    public static function inherit($parentWidgetClass)
    {
        $parentSettings = [];
        $parentWidget   = pluginApp($parentWidgetClass);
        if ($parentWidget instanceof DynamicWidget) {
            $parentSettings = $parentWidget->getSettings();
        }
        return self::create($parentSettings);
    }
    
    /**
     * Create a new factory instance with initial values.
     *
     * @param array $data
     * @return WidgetSettingsFactory
     */
    public static function create($data = [])
    {
        /** @var WidgetSettingsFactory $instance */
        $instance = pluginApp(WidgetSettingsFactory::class);
        foreach ($data as $key => $settingData) {
            if (array_key_exists('children', $settingData)) {
                $instance->settings[$key] = ContainerSettingFactory::create($settingData);
            } else {
                $instance->settings[$key] = BaseSettingFactory::create($settingData);
            }
        }
        
        return $instance;
    }
    
    /**
     * Create a generic widget settings entry.
     *
     * @param string $key The key of the new settings entry. If key already exists, previous entry will be overridden.
     *
     * @return BaseSettingFactory
     */
    public function createSetting($key)
    {
        /** @var BaseSettingFactory $setting */
        $setting = pluginApp(BaseSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a container entry which may contain nested settings.
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a vertical container
     *
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createVerticalContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $setting->withType("vertical");
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a horizontal container
     *
     * @param string $key
     * @return ContainerSettingFactory
     */
    public function createHorizontalContainer($key)
    {
        /** @var ContainerSettingFactory $setting */
        $setting = pluginApp(ContainerSettingFactory::class);
        $setting->withType("horizontal");
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a text input setting
     *
     * @param string $key
     * @return TextSettingFactory
     */
    public function createText($key)
    {
        /** @var TextSettingFactory $setting */
        $setting = pluginApp(TextSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a checkbox setting
     *
     * @param string $key
     * @return CheckboxSettingFactory
     */
    public function createCheckbox($key)
    {
        /** @var CheckboxSettingFactory $setting */
        $setting = pluginApp(CheckboxSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a color setting
     *
     * @return ColorPaletteSettingFactory
     */
    public function createColorPalette()
    {
        /** @var ColorPaletteSettingFactory $setting */
        $setting = pluginApp(ColorPaletteSettingFactory::class);
        $this->addSetting('colorPalette', $setting);
        return $setting;
    }

    /**
     * Create a date input setting
     *
     * @param string $key
     * @return DateSettingFactory
     */
    public function createDate($key)
    {
        /** @var DateSettingFactory $setting */
        $setting = pluginApp(DateSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a file picker setting
     *
     * @param string $key
     * @return FileSettingFactory
     */
    public function createFile($key)
    {
        /** @var FileSettingFactory $setting */
        $setting = pluginApp(FileSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a textarea input setting
     *
     * @param string $key
     * @return TextareaSettingFactory
     */
    public function createTextarea($key)
    {
        /** @var TextareaSettingFactory $setting */
        $setting = pluginApp(TextareaSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * @param string $key
     * @return BaseSettingFactory
     */
    public function createNumber($key)
    {
        $setting = $this->createSetting($key);
        $setting->withType('number');
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a double input setting
     *
     * @param string $key
     * @return DoubleSettingFactory
     */
    public function createDouble($key)
    {
        /** @var DoubleSettingFactory $setting */
        $setting = pluginApp(DoubleSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a dropdown setting
     *
     * @param string $key
     * @return SelectSettingFactory
     */
    public function createSelect($key)
    {
        /** @var SelectSettingFactory $setting */
        $setting = pluginApp(SelectSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a dropdown setting
     *
     * @param string $key
     * @return SuggestionSettingFactory
     */
    public function createSuggestion($key)
    {
        /** @var SuggestionSettingFactory $setting */
        $setting = pluginApp(SuggestionSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a category select setting
     *
     * @param string $key
     * @return CategorySettingFactory
     */
    public function createCategory($key)
    {
        /** @var CategorySettingFactory $setting */
        $setting = pluginApp(CategorySettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * @param string $key
     * @return BaseSettingFactory
     */
    public function createColor($key)
    {
        $setting = $this->createSetting($key);
        $setting->withType('color');
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a slider setting
     *
     * @param string $key
     * @return SliderSettingFactory
     */
    public function createSlider($key)
    {
        /** @var SliderSettingFactory $setting */
        $setting = pluginApp(SliderSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a checkbox group setting
     *
     * @param string $key
     * @return CheckboxGroupSettingFactory
     */
    public function createCheckboxGroup($key)
    {
        /** @var CheckboxGroupSettingFactory $setting */
        $setting = pluginApp(CheckboxGroupSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a checkbox group setting
     *
     * @param string $key
     * @return RadioGroupSettingFactory
     */
    public function createRadioGroup($key)
    {
        /** @var RadioGroupSettingFactory $setting */
        $setting = pluginApp(RadioGroupSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a url picker
     *
     * @param string $key
     * @return UrlSettingFactory
     */
    public function createUrl($key)
    {
        /** @var UrlSettingFactory $setting */
        $setting = pluginApp(UrlSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * @param string $key
     * @return EditorSettingFactory
     */
    public function createNoteEditor($key)
    {
        /** @var EditorSettingFactory $setting */
        $setting = pluginApp(EditorSettingFactory::class);
        $setting->withType('noteEditor');
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * @param string $key
     * @return EditorSettingFactory
     */
    public function createCodeEditor($key)
    {
        /** @var EditorSettingFactory $setting */
        $setting = pluginApp(EditorSettingFactory::class);
        $setting->withType('codeEditor');
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create an UUID setting
     *
     * @param $key
     * @return UUIDSettingFactory
     */
    public function createUUID($key)
    {
        /** @var UUIDSettingFactory $setting */
        $setting = pluginApp(UUIDSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * Create a manufacturer picker
     *
     * @param $key
     * @return ManufacturerSettingFactory
     */
    public function createManufacturer($key)
    {
        /** @var ManufacturerSettingFactory $setting */
        $setting = pluginApp(ManufacturerSettingFactory::class);
        $this->addSetting($key, $setting);
        return $setting;
    }
    
    /**
     * @return CustomClassSettingFactory
     */
    public function createCustomClass()
    {
        /** @var CustomClassSettingFactory $setting */
        $setting = pluginApp(CustomClassSettingFactory::class);
        $this->addSetting('customClass', $setting);
        return $setting;
    }
    
    /**
     * @param $optional
     * @return AppearanceSettingFactory
     */
    public function createAppearance($optional = false)
    {
        /** @var AppearanceSettingFactory $setting */
        $setting = pluginApp(AppearanceSettingFactory::class, ['optional' => $optional]);
        $this->addSetting('appearance', $setting);
        return $setting;
    }
    
    /**
     * @return IconSettingFactory
     */
    public function createIcon()
    {
        /** @var IconSettingFactory $setting */
        $setting = pluginApp(IconSettingFactory::class);
        $this->addSetting('icon', $setting);
        return $setting;
    }
    
    /**
     * @param $usePadding
     * @param $useMargin
     * @return SpacingSettingFactory
     */
    public function createSpacing($usePadding = true, $useMargin = true)
    {
        /** @var SpacingSettingFactory $setting */
        $setting = pluginApp(SpacingSettingFactory::class, ['usePadding' => $usePadding, 'useMargin' => $useMargin]);
        $this->addSetting('spacing', $setting);
        return $setting;
    }
    
    /**
     * @return HeightSettingFactory
     */
    public function createHeight()
    {
        /** @var HeightSettingFactory $setting */
        $setting = pluginApp(HeightSettingFactory::class);
        $this->addSetting('height', $setting);
        
        return $setting;
    }
    
    /**
     * @return ButtonSizeSettingFactory
     */
    public function createButtonSize()
    {
        /** @var ButtonSizeSettingFactory $setting */
        $setting = pluginApp(ButtonSizeSettingFactory::class);
        $this->addSetting('buttonSize', $setting);
        return $setting;
    }
    
    /**
     * @return AlignmentSettingFactory
     */
    public function createAlignment()
    {
        /** @var AlignmentSettingFactory $setting */
        $setting = pluginApp(AlignmentSettingFactory::class);
        $this->addSetting('alignment', $setting);
        return $setting;
    }
    
    public function toArray()
    {
        $result = [];
        /**
         * @var string $key
         * @var BaseSettingFactory $setting
         */
        foreach ($this->settings as $key => $setting) {
            $result[$key] = $setting->toArray();
        }
        return $result;
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
        $keyPath    = explode(".", $key);
        $currentKey = array_shift($keyPath);
        if (count($keyPath)) {
            // key references nested setting => try to access children
            $setting = $this->settings[$currentKey];
            if ($setting instanceof ContainerSettingFactory) {
                // continue resolving path in child factory instance
                return $setting->children->withPointer(implode(".", $keyPath));
            }
            
            // key not found or references setting has no nested children => reset pointer
            $this->pointer = -1;
        } else {
            // key references setting of this factory => calculate new pointer
            $pointer = array_search($currentKey, array_keys($this->settings));
            if ($pointer !== false) {
                $this->pointer = $pointer + 1;
            } else {
                $this->pointer = -1;
            }
        }
        
        // pointer has
        return $this;
    }
    
    private function addSetting($key, $setting)
    {
        if (is_null($this->pointer) || $this->pointer < 0) {
            $this->pointer = count($this->settings);
        }
        
        $settings = array_slice($this->settings, 0, $this->pointer, true)
            + [$key => $setting]
            + array_slice($this->settings, $this->pointer, null, true);
        
        $this->pointer++;
        $this->settings = $settings;
    }
}
