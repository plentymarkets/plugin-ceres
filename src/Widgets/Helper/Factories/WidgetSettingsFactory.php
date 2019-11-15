<?php

namespace Ceres\Widgets\Helper\Factories;

use Ceres\Widgets\Helper\Factories\Settings\CategorySettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CheckboxGroupSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\CheckboxSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\ContainerSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\BaseSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\DateSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\DoubleSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\EditorSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\FileSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\GenericSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\Includes\AppearanceSetting;
use Ceres\Widgets\Helper\Factories\Settings\Includes\CustomClassSetting;
use Ceres\Widgets\Helper\Factories\Settings\Includes\IconSetting;
use Ceres\Widgets\Helper\Factories\Settings\Includes\SpacingSetting;
use Ceres\Widgets\Helper\Factories\Settings\RadioGroupSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SelectSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SliderSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\SuggestionSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextareaSettingFactory;
use Ceres\Widgets\Helper\Factories\Settings\TextSettingFactory;

class WidgetSettingsFactory
{
    private $settings = [];

    /**
     * Create a generic widget settings entry.
     *
     * @param string    $key    The key of the new settings entry. If key already exists, previous entry will be overridden.
     *
     * @return GenericSettingFactory
     */
    public function createSetting($key)
    {
        /** @var GenericSettingFactory $setting */
        $setting = pluginApp(GenericSettingFactory::class);
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting->withType("vertical");
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
        $this->settings[$key] = $setting->withType("horizontal");
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
        return $setting;
    }

    /**
     * @param string $key
     * @return GenericSettingFactory
     */
    public function createNumber($key)
    {
        $setting = $this->createSetting($key);
        $setting->withType('number');
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
        return $setting;
    }

    /**
     * @param string $key
     * @return GenericSettingFactory
     */
    public function createColor($key)
    {
        $colorSetting = $this->createSetting($key);
        $colorSetting->withType('color');
        return $colorSetting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        $this->settings[$key] = $setting;
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
        return $setting;
    }

    /**
     * @return CustomClassSetting
     */
    public function createCustomClass()
    {
        /** @var CustomClassSetting $setting */
        $setting = pluginApp(CustomClassSetting::class);
        $this->settings['customClass'] = $setting;
        return $setting;
    }

    /**
     * @param $optional
     * @return AppearanceSetting
     */
    public function createAppearance($optional = false)
    {
        /** @var AppearanceSetting $setting */
        $setting = pluginApp(AppearanceSetting::class, [$optional]);
        $this->settings['appearance'] = $setting;
        return $setting;
    }

    /**
     * @return IconSetting
     */
    public function createIcon()
    {
        /** @var IconSetting $setting */
        $setting = pluginApp(IconSetting::class);
        $this->settings['icon'] = $setting;
        return $setting;
    }

    /**
     * @param $usePadding
     * @param $useMargin
     * @return SpacingSetting
     */
    public function createSpacing($usePadding, $useMargin)
    {
        /** @var SpacingSetting $setting */
        $setting = pluginApp(SpacingSetting::class, [$usePadding, $useMargin]);
        $this->settings['spacing'] = $setting;
        return $setting;
    }

    public function toArray()
    {
        $result = [];
        /**
         * @var string $key
         * @var BaseSettingFactory $setting
         */
        foreach($this->settings as $key => $setting)
        {
            $result[$key] = $setting->toArray();
        }
        return $result;
    }
}
