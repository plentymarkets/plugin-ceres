<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class NewsletterWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.NewsletterWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::NewsletterWidget")
            ->withLabel("Widget.newsletterLabel")
            ->withPreviewImageUrl("/images/widgets/newsletter.svg")
            ->withType(WidgetTypes::STATIC)
            ->withPosition(500)
            ->withSearchKeyWords([
                "newsletter"
            ])
            ->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();

        $settings->createCheckbox("showNameInputs")
            ->withDefaultValue(false)
            ->withName("Widget.newsletterShowNameInputsLabel");

        $settings->createCheckbox("showPrivacyPolicyCheckbox")
            ->withDefaultValue(true)
            ->withName("Widget.newsletterShowPrivacyPolicyCheckboxLabel");

        $settings->createNumber("emailFolder")
            ->withDefaultValue("")
            ->withName("Widget.newsletterEmailFolderLabel")
            ->withTooltip("Widget.newsletterEmailFolderTooltip");

        $settings->createButtonSize();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $hintText = "";

        if ( array_key_exists("hintText", $widgetSettings) && !empty($widgetSettings["hintText"]["mobile"]) )
        {
            $hintText = $widgetSettings["hintText"]["mobile"];
        }
        else
        {
            if ( array_key_exists("title", $widgetSettings) && !empty($widgetSettings["title"]["mobile"]) )
            {
                $hintText = "<h4>" . $widgetSettings["title"]["mobile"] . "</h4>";
            }

            if ( array_key_exists("subTitle", $widgetSettings) && !empty($widgetSettings["subTitle"]["mobile"]) )
            {
                $hintText .= "<p>" . $widgetSettings["subTitle"]["mobile"] . "</p>";
            }
        }

        return [
            "hintText" => $hintText
        ];
    }
}
