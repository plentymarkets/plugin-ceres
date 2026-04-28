<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class TextInputWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Form.TextInputWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::TextInputWidget")
            ->withLabel("Widget.textInputLabel")
            ->withPreviewImageUrl("/images/widgets/input-text.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(500)
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

        $settingsFactory->createCheckbox("isRequired")
            ->withDefaultValue(false)
            ->withName("Widget.mailFormFieldIsRequiredLabel")
            ->withTooltip("Widget.mailFormFieldIsRequiredTooltip");

        $settingsFactory->createCheckbox("isMailSubject")
            ->withDefaultValue(false)
            ->withName("Widget.textInputIsMailSubjectLabel")
            ->withTooltip("Widget.textInputIsMailSubjectTooltip");

        $settingsFactory->createCheckbox("isReplyToName")
            ->withDefaultValue(false)
            ->withName("Widget.textInputIsReplyToNameLabel")
            ->withTooltip("Widget.textInputIsReplyToNameTooltip");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
