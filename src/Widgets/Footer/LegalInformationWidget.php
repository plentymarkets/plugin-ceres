<?php

namespace Ceres\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class LegalInformationWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Footer.LegalInformationWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::LegalInformationWidget")
            ->withLabel("Widget.legalInformationLabel")
            ->withPreviewImageUrl("/images/widgets/legal-information.svg")
            ->withType(WidgetTypes::FOOTER)
            ->withCategory(WidgetCategories::FOOTER)
            ->withPosition(200)
            ->withSearchKeyWords([
                "datenschutz", "legal", "privacy"
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

        $cancellationFormContainer = $settingsFactory->createVerticalContainer("cancellationFormContainer")
            ->withName("Widget.legalInformationCancellationFormContainerLabel")
            ->children;

        $cancellationFormContainer->createCheckbox("showCancellationForm")
            ->withDefaultValue(true)
            ->withName("Widget.legalInformationShowCancellationFormLabel");

        $cancellationFormContainer->createCheckbox("useCancellationPdfUpload")
            ->withDefaultValue(false)
            ->withCondition("cancellationFormContainer.showCancellationForm")
            ->withName("Widget.legalInformationCancellationPdfActiveLabel");

        $cancellationFormContainer->createFile("cancellationPdfPath")
            ->withCondition("cancellationFormContainer.showCancellationForm && cancellationFormContainer.useCancellationPdfUpload")
            ->withName("Widget.legalInformationCancellationPdfUploadLabel")
            ->withTooltip("Widget.legalInformationCancellationPdfUploadTooltip")
            ->withAllowedExtensions(["pdf"]);

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
