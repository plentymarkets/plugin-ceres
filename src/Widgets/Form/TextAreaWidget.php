<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TextAreaWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Form.TextAreaWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TextAreaWidget")
            ->withLabel("Widget.textAreaLabel")
            ->withPreviewImageUrl("/images/widgets/input-textarea.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(400)
            ->withSearchKeyWords([
                "form", "formular", "kontakt", "contact", "mail", "text", "textfeld"
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

        $settingsFactory->createNumber("rows")
            ->withDefaultValue(15)
            ->withName("Widget.textAreaRowsLabel")
            ->withTooltip("Widget.textAreaRowsTooltip");

        $settingsFactory->createCheckbox("fixedHeight")
            ->withDefaultValue(false)
            ->withName("Widget.textAreaFixedHeightLabel")
            ->withTooltip("Widget.textAreaFixedHeightTooltip");

        $settingsFactory->createCheckbox("isRequired")
            ->withDefaultValue(false)
            ->withName("Widget.mailFormFieldIsRequiredLabel")
            ->withTooltip("Widget.mailFormFieldIsRequiredTooltip");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
