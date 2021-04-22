<?php

namespace Ceres\Widgets\Contact;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ContactDetailsWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Contact.ContactDetailsWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ContactDetailsWidget")
            ->withLabel("Widget.contactDetailsLabel")
            ->withPreviewImageUrl("/images/widgets/contact-details.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::CONTACT)
            ->withPosition(100)
            ->withSearchKeyWords([
                "contact", "kontakt", "mail", "telefon", "phone", "details", "kontaktdaten"
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
        $settingsFactory->createAppearance(true);

        $settingsFactory->createText("phone")
            ->withName("Widget.contactDetailsPhoneLabel")
            ->withTooltip("Widget.contactDetailsPhoneTooltip");

        $settingsFactory->createText("fax")
            ->withName("Widget.contactDetailsFaxLabel")
            ->withTooltip("Widget.contactDetailsFaxTooltip");

        $settingsFactory->createText("email")
            ->withName("Widget.contactDetailsEmailLabel")
            ->withTooltip("Widget.contactDetailsEmailTooltip");

        $settingsFactory->createSpacing(false, true);

        return $settingsFactory->toArray();
    }
}
