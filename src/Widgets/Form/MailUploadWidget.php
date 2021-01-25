<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class MailUploadWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Form.MailUploadWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::MailUploadWidget")
            ->withLabel("Widget.mailFormUploadLabel")
            ->withPreviewImageUrl("/images/widgets/input-upload.svg")
            ->withType(WidgetTypes::FORM)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(200)
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
            ->withDefaultValue("Widget.mailFormUploadLabel")
            ->withName("Widget.mailFormFieldLabelLabel")
            ->withTooltip("Widget.mailFormFieldLabelTooltip");

        $settingsFactory->createCheckboxGroup("allowedFileTypes")
            ->withDefaultValue(
                [
                    "image/*",
                    "audio/*",
                    "video/*"
                ]
            )
            ->withName("Widget.mailFormUploadAllowedFileTypes")
            ->withTooltip("Widget.mailFormUploadAllowedFileTypesTooltips")
            ->withCheckboxValues(
                ValueListFactory::make()
                    ->addEntry("image/*", "Widget.mailFormUploadAllowedFileTypesImages")
                    ->addEntry("audio/*", "Widget.mailFormUploadAllowedFileTypesAudio")
                    ->addEntry("video/*", "Widget.mailFormUploadAllowedFileTypesVideo")
                    ->toArray()
        );
        
        $settingsFactory->createText("allowedFileExtensions")
            ->withDefaultValue("pdf,zip")
            ->withName("Widget.mailFormUploadAllowedFileExtensions")
            ->withTooltip("Widget.mailFormUploadAllowedFileExtensionsTooltip");

        $settingsFactory->createCheckbox("isRequired")
            ->withDefaultValue(false)
            ->withName("Widget.mailFormFieldIsRequiredLabel")
            ->withTooltip("Widget.mailFormFieldIsRequiredTooltip");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
