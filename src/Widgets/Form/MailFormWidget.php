<?php

namespace Ceres\Widgets\Form;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class MailFormWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Form.MailFormWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::MailFormWidget")
            ->withLabel("Widget.mailFormLabel")
            ->withPreviewImageUrl("/images/widgets/mail-form.svg")
            ->withType(WidgetTypes::DEFAULT)
            ->withCategory(WidgetCategories::FORM)
            ->withPosition(100)
            ->withAllowedNestingTypes([WidgetTypes::STRUCTURE, WidgetTypes::STATIC, WidgetTypes::DEFAULT, WidgetTypes::FORM])
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();
        $settingsFactory->createAppearance(true);

        $settingsFactory->createText("labelSubmit")
            ->withDefaultValue("")
            ->withName("Widget.mailFormSubmitLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormSubmitTooltip")
            ;

        $settingsFactory->createText("mailTarget")
            ->withDefaultValue("")
            ->withName("Widget.mailFormMailTargetLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormMailTargetTooltip")
            ;

        $settingsFactory->createText("subject")
            ->withDefaultValue("")
            ->withName("Widget.mailFormSubjectLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormSubjectTooltip")
            ;

        $settingsFactory->createText("ccAddresses")
            ->withDefaultValue("")
            ->withList(1)
            ->withName("Widget.mailFormCCAddressesLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormCCAddressesTooltip")
            ;

        $settingsFactory->createText("bccAddresses")
            ->withDefaultValue("")
            ->withList(1)
            ->withName("Widget.mailFormBCCAddressesLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormBCCAddressesTooltip")
            ;

        $settingsFactory->createSelect("buttonSize")
            ->withDefaultValue("")
            ->withName("Widget.mailFormBCCAddressesLabel")
            // TODO tooltip
            //->withTooltip("Widget.mailFormBCCAddressesTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry("btn-sm", "Widget.widgetButtonSizeSm")
                    ->addEntry("", "Widget.widgetButtonSizeNormal")
                    ->addEntry("btn-lg", "Widget.widgetButtonSizeLg")
                    ->toArray()
            );

        $settingsFactory->createSpacing(true, true);

        return $settingsFactory->toArray();
    }


}
