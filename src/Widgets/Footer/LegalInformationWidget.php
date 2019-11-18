<?php

namespace Ceres\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetTypes;

class LegalInformationWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Footer.LegalInformationWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LegalInformationWidget")
            ->withLabel("Widget.legalInformationLabel")
            ->withPreviewImageUrl("/images/widgets/legal-information.svg")
            ->withType(WidgetTypes::FOOTER)
            ->withCategory(WidgetCategories::FOOTER)
            ->withPosition(1200)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createCheckbox("showCancellationRights")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowCancellationLabel");

        $settingsFactory->createCheckbox("showLegalDisclosure")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowLegalDisclosureLabel");

        $settingsFactory->createCheckbox("showPrivacyPolicy")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowPrivacyPolicyLabel");

        $settingsFactory->createCheckbox("showGtc")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowGtcLabel");

        $settingsFactory->createCheckbox("showGtc")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowGtcLabel");

        $verticalContainerChildren = $settingsFactory->createVerticalContainer("cancellationFormContainer")
            ->withName("Widget.legalInformationCancellationFormContainerLabel")
            ->children;

        $verticalContainerChildren->createCheckbox("showCancellationForm")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowCancellationFormLabel");

        $verticalContainerChildren->createCheckbox("useCancellationPdfUpload")
            ->withDefaultValue(false)
            ->withCondition("cancellationFormContainer.showCancellationForm")
            ->withName("Widget.legalInformationCancellationPdfActiveLabel");

        // TODO add tooltip
        $verticalContainerChildren->createFile("useCancellationPdfUpload")
            ->withCondition("cancellationFormContainer.showCancellationForm && cancellationFormContainer.useCancellationPdfUpload")
            ->withName("Widget.legalInformationCancellationPdfUploadLabel")
            //->withTooltip("Widget.legalInformationCancellationPdfUploadTooltip")
            ->withAllowedExtensions(["pdf"]);

        $settingsFactory->createSpacing(true, true);
    }
}
