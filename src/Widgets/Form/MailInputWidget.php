<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class MailInputWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Form.MailInputWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::MailInputWidget")
            ->withLabel("Widget.mailInputLabel")
            ->withPreviewImageUrl("/images/widgets/input-mail.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(200)
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

        $settingsFactory->createCheckbox("allowMailCC")
            ->withDefaultValue(false)
            ->withName("Widget.mailInputAllowMailCCLabel");

        $settingsFactory->createCheckbox("replyToMail")
            ->withDefaultValue(false)
            ->withName("Widget.mailInputReplyToMailLabel");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
