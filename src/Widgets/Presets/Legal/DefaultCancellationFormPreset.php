<?php

namespace Ceres\Widgets\Presets\Legal;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Ceres\Config\CeresConfig;
use Plenty\Plugin\Translation\Translator;
use Plenty\Modules\Webshop\Helpers\UrlQuery;
use IO\Extensions\Constants\ShopUrls;

/**
 * Class DefaultCancellationFormPreset
 *
 * This is a preset for ShopBuilder contents. Presets can be applied during content creation to generate a default content with predefined and configured widgets.
 * This particular preset generates a page for viewing the shop's cancellation form. It contains:
 * - CodeWidget
 * - SeparatorWidget
 * - LegalTextsWidget
 * - PrintButtonWidget
 *
 * @package Ceres\Widgets\Presets\Legal
 */
class DefaultCancellationFormPreset implements ContentPreset
{
    const IDENTIFIER_MAIL_TEMPLATE_NAME = 'name';
    const IDENTIFIER_MAIL_TEMPLATE_ORDER = 'order';
    const IDENTIFIER_MAIL_TEMPLATE_EMAIL = 'email';
    const IDENTIFIER_MAIL_TEMPLATE_REASON = 'reason';
    
    /** @var PresetHelper $preset */
    private $preset;

    /** @var CeresConfig */
    private $config;

    /** @var Translator */
    private $translator;
    
    /**
     * @inheritDoc
     */
    public function getWidgets()
    {
        $this->config = pluginApp(CeresConfig::class);
        $this->translator = pluginApp(Translator::class);
        
        $this->preset = pluginApp(PresetHelper::class);

        $this->createHeadline();
        $this->createLegalTextsWidget();
        $this->createMailForm();

        return $this->preset->toArray();
    }

    private function createHeadline()
    {
        $text = '';
        $text .= '{% autoescape false %}';
        $text .= '<h1 class="print-header">{{ trans("Ceres::Template.cancellationForm", {"hyphen": "&shy;"}) }}</h1>';
        $text .= '{% endautoescape %}';

        $this->preset->createWidget('Ceres::CodeWidget')
                     ->withSetting("text", $text)
                     ->withSetting("appearance", "none")
                     ->withSetting("spacing.customPadding", true)
                     ->withSetting("spacing.padding.top.value", 3)
                     ->withSetting("spacing.padding.top.unit", null)
                     ->withSetting("spacing.padding.bottom.value", 0)
                     ->withSetting("spacing.padding.bottom.unit", null)
                     ->withSetting("spacing.customMargin", true)
                     ->withSetting("spacing.margin.bottom.value", 0)
                     ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createLegalTextsWidget()
    {
        $this->preset->createWidget("Ceres::LegalTextsWidget")
            ->withSetting("type", "cancellationForm")
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 0)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createMailForm()
    {
        $formWidget = $this->preset->createWidget('Ceres::MailFormWidget')
            ->withSetting('appearance', 'primary')
            ->withSetting('labelSubmit', $this->translator->trans('Ceres::Template.cancellationFormSend'))
            ->withSetting(
                'mailTarget',
                $this->config->contact->shopMail !== 'your@email.com' ? $this->config->contact->shopMail : ''
            )
            ->withSetting('typeForm', 'contract-withdrawal')
            ->withSetting('ccAddresses', [$this->config->contact->mailCC])
            ->withSetting('bccAddresses', [$this->config->contact->mailBCC]);


        $formWidget->createChild('formFields', 'Ceres::TextInputWidget')
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormFullName'))
            ->withSetting('isRequired', true)
            ->withSetting('isReplyToName', true)
            ->withSetting('key', self::IDENTIFIER_MAIL_TEMPLATE_NAME);

        $formWidget->createChild('formFields', 'Ceres::TextInputWidget')
            ->withSetting('isRequired', true)
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormOrderNumber'))
            ->withSetting('key', self::IDENTIFIER_MAIL_TEMPLATE_ORDER);

        $formWidget->createChild('formFields', 'Ceres::MailInputWidget')
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormContactMail'))
            ->withSetting('isRequired', true)
            ->withSetting('replyToMail', true)
            ->withSetting('key', self::IDENTIFIER_MAIL_TEMPLATE_EMAIL);

        $formWidget->createChild('formFields', 'Ceres::TextAreaWidget')
            ->withSetting('customClass','contact-form-message')
            ->withSetting('rows', 15)
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormReason'))
            ->withSetting('fixedHeight', true)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 3)
            ->withSetting('spacing.margin.top.unit', null)
            ->withSetting('key', self::IDENTIFIER_MAIL_TEMPLATE_REASON);

        $formWidget->createChild('privacyDisclaimer', 'Ceres::InlineTextWidget')
            ->withSetting("text", $this->createDataPrivacyDisclaimerText())
            ->withSetting("appearance", "none")
            ->withSetting("spacing.customPadding", true)
            ->withSetting("spacing.padding.top.value", 3)
            ->withSetting("spacing.padding.top.unit", null)
            ->withSetting("spacing.padding.bottom.value", 0)
            ->withSetting("spacing.padding.bottom.unit", null)
            ->withSetting("spacing.customMargin", true)
            ->withSetting("spacing.margin.bottom.value", 0)
            ->withSetting("spacing.margin.bottom.unit", null);
    }

    private function createDataPrivacyDisclaimerText(): string
    {
        /** @var ShopUrls $shopUrls */
        $shopUrls = pluginApp(ShopUrls::class);
        /** @var UrlQuery $urlQuery */
        $urlQuery = pluginApp(UrlQuery::class, ['path' => $shopUrls->privacyPolicy]);

        if ($urlQuery == '') {
            return '';
        }
        $privacyHtml = '<a href="' . $urlQuery->toAbsoluteUrl() . '" target="_blank">';
        $privacyHtml .=     '<span>';
        $privacyHtml .=         $this->translator->trans("Ceres::Template.contactPrivacyPolicy", ["hyphen" => "&shy;"]);
        $privacyHtml .=     '</span>';
        $privacyHtml .= '</a>';

        $text = '<p>';
        $text .=  $this->translator->trans("Ceres::Template.cancellationFormPrivacyPolicy", ["privacy" => $privacyHtml]);
        $text .= '</p>';

        return $text;
    }
}
