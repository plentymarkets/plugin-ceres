<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SelectionWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Form.SelectionWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SelectionWidget")
            ->withLabel("Widget.selectionLabel")
            ->withPreviewImageUrl("/images/widgets/input-select.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(700)
            ->withSearchKeyWords([
                "form", "formular", "kontakt", "contact", "mail"
            ])
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

        $settingsFactory->createText("key")
            ->withDefaultValue("")
            ->withName("Widget.mailFormFieldKeyLabel")
            ->withTooltip("Widget.mailFormFieldKeyTooltip");

        $settingsFactory->createText("label")
            ->withDefaultValue("")
            ->withName("Widget.mailFormFieldLabelLabel")
            ->withTooltip("Widget.mailFormFieldLabelTooltip");

        $settingsFactory->createCheckbox("isRequired")
             ->withDefaultValue(false)
             ->withName("Widget.mailFormFieldIsRequiredLabel")
             ->withTooltip("Widget.mailFormFieldIsRequiredTooltip");
 
        $settingsFactory->createSelect("selectType")
             ->withDefaultValue("dropdown")
             ->withName("Widget.selectionSelectTypeLabel")
             ->withTooltip("Widget.selectionSelectTypeTooltip")
             ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("dropdown", "Widget.selectionSelectTypeDropdown")
                    ->addEntry("radio", "Widget.selectionSelectTypeRadio")
                    ->addEntry("checkbox", "Widget.selectionSelectTypeCheckbox")
                    ->toArray());

        $settingsFactory->createNumber("minRequired")
            ->withCondition("isRequired && selectType == 'checkbox'")
            ->withDefaultValue(1)
            ->withName("Widget.selectionCheckboxMinRequiredLabel")
            ->withTooltip("Widget.selectionCheckboxMinRequiredTooltip");
    
        $settingsFactory->createNumber("maxRequired")
            ->withCondition("isRequired && selectType == 'checkbox'")
            ->withDefaultValue(1)
            ->withName("Widget.selectionCheckboxMaxRequiredLabel")
            ->withTooltip("Widget.selectionCheckboxMaxRequiredTooltip");

        $settingsFactory->createText("selectOptions")
            ->withList(1)
            ->withName("Widget.selectionOptionsLabel")
            ->withTooltip("Widget.selectionOptionsTooltip");

        $spacingChildrenFactory = $settingsFactory->createVerticalContainer("spacing")
            ->withName("Widget.widgetSpacing")
            ->children;

        $spacingChildrenFactory->createCheckbox("customPadding")
            ->withCondition("selectType !== 'dropdown'")
            ->withName("Widget.widgetCustomPadding");

        $spacingChildrenFactory->createSetting('padding')
            ->withType('spacing')
            ->withCondition("!!spacing.customPadding && selectType !== 'dropdown'")
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');

        $spacingChildrenFactory->createCheckbox('customMargin')
            ->withName('Widget.widgetCustomMargin');

        $spacingChildrenFactory->createSetting('margin')
            ->withType('spacing')
            ->withCondition('!!spacing.customMargin')
            ->withOption('units', ['px', 'rem'])
            ->withOption('direction', 'all');

        return $settingsFactory->toArray();
    }
}
