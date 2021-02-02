<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class MailAttachmentWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Form.MailAttachmentWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::MailAttachmentWidget")
            ->withLabel("Widget.mailFormAttachmentLabel")
            ->withPreviewImageUrl("/images/widgets/mail-attachment.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(600)
            ->toArray();
    }

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

        $settingsFactory->createCheckboxGroup("allowedFileExtensions")
            ->withDefaultValue(
                [
                    ",.pdf,.docx,.doc,.odt,.txt",
                    ",.jpg,.png,.svg,.psd,.ps",
                    ",.zip",
                ]
            )
            ->withName("Widget.mailFormAttachmentAllowedFileExtensions")
            ->withTooltip("Widget.mailFormAttachmentAllowedFileExtensionsTooltip")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry(",.pdf,.docx,.doc,.odt,.txt", "Widget.mailFormAttachmentAllowedFileExtensionsDocuments")
                    ->addEntry(",.jpg,.png,.svg,.psd,.ps", "Widget.mailFormAttachmentAllowedFileExtensionsImages")
                    ->addEntry(",.zip", "Widget.mailFormAttachmentAllowedFileExtensionsZip")
                    ->toArray()
        );
        
        $settingsFactory->createCheckbox("allowMultiple")
            ->withDefaultValue(false)
            ->withName("Widget.mailFormAttachmentAllowMultiple")
            ->withTooltip("Widget.mailFormAttachmentAllowMultipleTooltip");

        $settingsFactory->createCheckbox("isRequired")
            ->withDefaultValue(false)
            ->withName("Widget.mailFormFieldIsRequiredLabel")
            ->withTooltip("Widget.mailFormFieldIsRequiredTooltip");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
