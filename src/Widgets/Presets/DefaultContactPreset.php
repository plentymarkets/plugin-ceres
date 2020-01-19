<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
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

    public function getWidgets()
    {
        $this->config = pluginApp(CeresConfig::class);
        $this->preset = pluginApp(PresetHelper::class);
        $this->translator = pluginApp(Translator::class);

        $this->createHeadline();

        if(strlen($this->config->contact->apiKey))
        {
            $row_1 = $this->preset->createWidget("Ceres::TwoColumnWidget")
                ->withSetting("layout", "oneToOne")
                ->withSetting("layoutTablet", "oneToTwo")
                ->withSetting("layoutMobile", "stackedMobile");

            $this->createContactDetailsWidget( $row_1, "first" );
            $this->createGoogleMapsWidget( $row_1, "second", $this->config->contact->apiKey);   // Migrate API Key
            $this->createMailForm();
        }
        else
        {
            $row_1 = $this->preset->createWidget("Ceres::TwoColumnWidget")
                ->withSetting("layout", "threeToNine")
                ->withSetting("layoutTablet", "stackedTablet")
                ->withSetting("layoutMobile", "stackedMobile");

            $this->createContactDetailsWidget( $row_1, "first" );
            $this->createMailForm( $row_1, "second" );
        }

        return $this->preset->toArray();
    }

    /**
     * @param string                $identifier
     * @param PresetWidgetFactory   $parentFactory
     * @param string                $parentDropzone
     *
     * @return PresetWidgetFactory
     */
    private function createRootOrChild( $identifier, $parentFactory = null, $parentDropzone = null )
    {
        return is_null($parentFactory)
            ? $this->preset->createWidget($identifier)
            : $parentFactory->createChild($parentDropzone, $identifier);
    }

    private function createHeadline()
    {
        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", "<h1>{{ trans(\"Ceres::Template.contact\") }}</h1>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.padding.left.value", 0)
            ->withSetting("spacing.padding.left.unit", null)
            ->withSetting("spacing.padding.right.value", 0)
            ->withSetting("spacing.padding.right.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 3)
            ->withSetting("spacing.margin.top.unit", null);

        $this->preset->createWidget("Ceres::SeparatorWidget");

        $this->preset->createWidget("Ceres::InlineTextWidget")
            ->withSetting("text", "<p>{{ trans(\"Ceres::Template.contactShopMessage\") }}</p>")
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 5)
            ->withSetting("spacing.margin.bottom.unit", null)
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

    private function createContactDetailsWidget( $parentFactory = null, $parentDropzone = null )
    {
        $this->createRootOrChild("Ceres::ContactDetailsWidget", $parentFactory, $parentDropzone )
            ->withSetting("address", $this->translator->trans("Ceres::Widget.contactDetailsPlaceholderAddress"))
            ->withSetting("phone", $this->translator->trans("Ceres::Widget.contactDetailsPlaceholderPhone"))
            ->withSetting("fax", $this->translator->trans("Ceres::Widget.contactDetailsPlaceholderFax"))
            ->withSetting("email", $this->translator->trans("Ceres::Widget.contactDetailsPlaceholderEmail"))
            ->withSetting("businessTimes", "{{ trans(\"Ceres::Template.contactOpeningTimes\") }}")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 4)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);
    }

    private function createGoogleMapsWidget( $parentFactory = null, $parentDropzone = null, $apiKey = "")
    {
        $this->createRootOrChild("Ceres::GoogleMapsWidget", $parentFactory, $parentDropzone )
            ->withSetting("apiKey", $apiKey)
            ->withSetting("address", "")
            ->withSetting("zoom", 16)
            ->withSetting("maptype", "roadmap")
            ->withSetting("aspectRatio", "prop-xs-3-1");
    }

    private function createMailForm( $parentFactory = null, $parentDropzone = null )
    {
        $formWidget = $this->createRootOrChild("Ceres::MailFormWidget", $parentFactory, $parentDropzone )
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
            ->withSetting("isMailSubject", true);

        $row_2->createChild("second", "Ceres::TextInputWidget")
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactOrderId"));

        //
        // ROW 3: Message
        //
        $formWidget->createChild("formFields", "Ceres::TextAreaWidget")
            ->withSetting("rows", 15)
            ->withSetting("label", $this->translator->trans("Ceres::Template.contactMessage"))
            ->withSetting("fixedHeight", true)
            ->withSetting("isRequired", true)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.top.value", 3)
            ->withSetting("spacing.margin.top.unit", null);

        $textWidget = null;

        if($this->config->contact->enableConfirmingPrivacyPolicy)
        {
            $row_3 = $formWidget->createChild("formFields", "Ceres::TwoColumnWidget")
                ->withSetting("layout", "oneToOne");

            $row_3->createChild("first", "Ceres::AcceptPrivacyPolicyWidget")
                  ->withSetting("customClass", "");

            $textWidget = $row_3->createChild("second", "Ceres::InlineTextWidget");
        }
        else
        {
            $textWidget = $formWidget->createChild("formFields", "Ceres::InlineTextWidget");
        }

        $textWidget
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
