<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultContactPreset implements ContentPreset
{
    /** @var CeresConfig */
    private $config;

    /** @var PresetHelper */
    private $preset;
    
    /** @var Translator */
    private $translator;

    /** @var PresetWidgetFactory */
    private $twoColumnWidget;

    public function getWidgets()
    {
        $this->config = pluginApp(CeresConfig::class);
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);

        $this->createHeadline();

        $this->createTwoColumnWidget();
        $this->createContactDetailsWidget();
        $this->createGoogleMapsWidget();

        $this->createMailForm();

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::CodeWidget")
            ->withSetting("text", "<h1>{{ trans(\"Ceres::Template.contact\") }}</h1>")
            ->withSetting("appearance", "none");

        $this->preset->createWidget("Ceres::SeparatorWidget");

        $this->preset->createWidget("Ceres::CodeWidget")
            ->withSetting("text", "<p>{{ trans(\"Ceres::Template.contactShopMessage\") }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 5)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createTwoColumnWidget()
    {
        $this->twoColumnWidget = $this->preset->createWidget("Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne")
            ->withSetting("layoutTablet", "stackedTablet")
            ->withSetting("layoutMobile", "stackedMobile");
    }

    private function createContactDetailsWidget()
    {
        $this->twoColumnWidget->createChild("first", "Ceres::ContactDetailsWidget")
            ->withSetting("address", "plentySystems AG<br>Bürgermeister-Brunner-Straße 15<br>34117 Kassel<br>Germany<br>")
            ->withSetting("phone", "+49 561 98 681 100")
            ->withSetting("fax", "+49 561 98 681 111")
            ->withSetting("email", "sales@plentymarkets.com")
            ->withSetting("businessTimes", "{{ trans(\"Ceres::Template.contactOpeningTimes\") }}")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);
    }

    private function createGoogleMapsWidget()
    {
        $this->twoColumnWidget->createChild("second", "Ceres::GoogleMapsWidget");
    }   

    private function createMailForm()
    {
        $formWidget = $this->preset->createWidget("Ceres::MailFormWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("labelSubmit", $this->translator->trans("Ceres::Template.contactSend"))
            ->withSetting("mailTarget", $this->config->contact->shopMail !== "your@email.com" ? $this->config->contact->shopMail : "")
            ->withSetting("ccAddresses", [$this->config->contact->mailCC])
            ->withSetting("bccAddresses", [$this->config->contact->mailBCC]);

        //
        // ROW 1: Name & Mail
        //
        $row_1 = $formWidget->createChild("formFields", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne");

        $row_1->createChild("first", "Ceres::TextInputWidget")
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactName"))
            ->withSetting("isReplyToName", true);

        $row_1->createChild("second", "Ceres::MailInputWidget")
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactMail"))
            ->withSetting("isRequired", true)
            ->withSetting("replyToMail", true)
            ->withSetting("allowMailCC", true);

        //
        // ROW 2: Subject & Order id
        //
        $row_2 = $formWidget->createChild("formFields", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne");

        $row_2->createChild("first", "Ceres::TextInputWidget")
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactSubject"))
            ->withSetting("isRequired", true)
            ->withSetting("isMailSubject", true)
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);

        $row_2->createChild("second", "Ceres::TextInputWidget")
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactOrderId"))
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);

        //
        // ROW 3: Message
        //
        $formWidget->createChild("formFields", "Ceres::TextAreaWidget")
            ->withSetting("rows", 15)
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactMessage"))
            ->withSetting("fixedHeight", true)
            ->withSetting("isRequired", true);

        $formWidget->createChild("formFields", "Ceres::InlineTextWidget")
            ->withSetting("appearance", "none")
            ->withSetting("text", "<p class=\"align-right\">* {{ trans(\"Ceres::Template.contactRequiredField\") }}</p>")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null);
    }
}
