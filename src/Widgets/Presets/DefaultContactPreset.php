<?php

namespace Ceres\Widgets\Presets;

use Ceres\Config\CeresConfig;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Plenty\Plugin\Translation\Translator;

class DefaultContactPreset implements ContentPreset
{
    /**
     * Get the widget configurations of the presets to be assigned to the created content.
     *
     * @return mixed
     */
    public function getWidgets()
    {
        /** @var CeresConfig $config */
        $config = pluginApp(CeresConfig::class);

        /** @var PresetHelper $preset */
        $preset = pluginApp(PresetHelper::class);

        /** @var Translator $translator */
        $translator = pluginApp(Translator::class);

        $formWidget = $preset->createWidget("Ceres::MailFormWidget")
            ->withSetting("appearance", "primary")
            ->withSetting("labelSubmit", $translator->trans("Ceres::Template.contactSend"))
            ->withSetting("mailTarget", $config->contact->shopMail !== "your@email.com" ? $config->contact->shopMail : "")
            ->withSetting("ccAddresses", [$config->contact->mailCC])
            ->withSetting("bccAddresses", [$config->contact->mailBCC]);

        //
        // ROW 1: Name & Mail
        //
        $row_1 = $formWidget->createChild("formFields", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne");

        $row_1->createChild("first", "Ceres::TextInputWidget")
            ->withSetting("label", $translator->trans("Ceres::Template.contactName"))
            ->withSetting("isReplyToName", true);

        $row_1->createChild("second", "Ceres::MailInputWidget")
            ->withSetting("label", $translator->trans("Ceres::Template.contactMail"))
            ->withSetting("isRequired", true)
            ->withSetting("replyToMail", true)
            ->withSetting("allowMailCC", true);

        //
        // ROW 2: Subject & Order id
        //
        $row_2 = $formWidget->createChild("formFields", "Ceres::TwoColumnWidget")
            ->withSetting("layout", "oneToOne");

        $row_2->createChild("first", "Ceres::TextInputWidget")
            ->withSetting("label", $translator->trans("Ceres::Template.contactSubject"))
            ->withSetting("isRequired", true)
            ->withSetting("isMailSubject", true)
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);

        $row_2->createChild("second", "Ceres::TextInputWidget")
            ->withSetting("label", $translator->trans("Ceres::Template.contactOrderId"))
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.bottom.value", 5)
            ->withSetting("spacing.padding.bottom.unit", null);

        //
        // ROW 3: Message
        //
        $formWidget->createChild("formFields", "Ceres::TextAreaWidget")
            ->withSetting("rows", 15)
            ->withSetting("label", $translator->trans("Ceres::Template.contactMessage"))
            ->withSetting("fixedHeight", true)
            ->withSetting("isRequired", true);

        $formWidget->createChild("formFields", "Ceres::InlineTextWidget")
            ->withSetting("appearance", "none")
            ->withSetting("text", '<p class="align-right">*{{ trans("Ceres::Template.contactRequiredField") }}</p>')
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 0)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null);

        return $preset->toArray();
    }
}