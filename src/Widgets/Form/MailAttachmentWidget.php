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
            ->withSearchKeyWords([
                "form", "formular", "kontakt", "contact", "mail", "anhang", "attachment"
            ])
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
                    ",application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.oasis.opendocument.text",
                    ",image/vnd.adobe.photoshop,image/svg+xml,image/psd,image/png,image/jpeg,application/psd,application/x-photoshop",
                    ",application/zip",
                ]
            )
            ->withName("Widget.mailFormAttachmentAllowedFileExtensions")
            ->withTooltip("Widget.mailFormAttachmentAllowedFileExtensionsTooltip")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry(",application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.oasis.opendocument.text", "Widget.mailFormAttachmentAllowedFileExtensionsDocuments")
                    ->addEntry(",image/vnd.adobe.photoshop,image/svg+xml,image/psd,image/png,image/jpeg,application/psd,application/x-photoshop", "Widget.mailFormAttachmentAllowedFileExtensionsImages")
                    ->addEntry(",application/zip", "Widget.mailFormAttachmentAllowedFileExtensionsZip")
                    ->toArray()
        );

        $settingsFactory->createCheckbox("allowMultiple")
            ->withName("Widget.mailFormAttachmentAllowMultiple")
            ->withTooltip("Widget.mailFormAttachmentAllowMultipleTooltip")
            ->withDefaultValue(false);

        $settingsFactory->createCheckbox("isRequired")
            ->withName("Widget.mailFormFieldIsRequiredLabel")
            ->withTooltip("Widget.mailFormFieldIsRequiredTooltip")
            ->withDefaultValue(false);

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
