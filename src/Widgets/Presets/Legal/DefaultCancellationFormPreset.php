<?php

namespace Ceres\Widgets\Presets\Legal;

use Ceres\Widgets\Helper\Factories\PresetWidgetFactory;
use Ceres\Widgets\Helper\PresetHelper;
use Plenty\Modules\ShopBuilder\Contracts\ContentPreset;
use Ceres\Config\CeresConfig;
use Plenty\Plugin\Translation\Translator;

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
            ->withSetting('isReplyToName', true);

        $formWidget->createChild('formFields', 'Ceres::TextInputWidget')
            ->withSetting('isRequired', true)
            ->withSetting('isOrderId', true)
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormOrderNumber'));

        $formWidget->createChild('formFields', 'Ceres::MailInputWidget')
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormContactMail'))
            ->withSetting('isRequired', true)
            ->withSetting('replyToMail', true);

        $formWidget->createChild('formFields', 'Ceres::TextAreaWidget')
            ->withSetting('customClass','contact-form-message')
            ->withSetting('rows', 15)
            ->withSetting('label', $this->translator->trans('Ceres::Template.cancellationFormReason'))
            ->withSetting('fixedHeight', true)
            ->withSetting('spacing.customMargin', true)
            ->withSetting('spacing.margin.top.value', 3)
            ->withSetting('spacing.margin.top.unit', null);
    }
}
