<?php

namespace Ceres\Widgets\Common;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class NewsletterUnsubscribeWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.Common.NewsletterUnsubscribeWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::NewsletterUnsubscribeWidget")
            ->withLabel("Widget.newsletterUnsubscribeLabel")
            ->withPreviewImageUrl("/images/widgets/newsletter-unsubscribe.svg")
            ->withType(WidgetTypes::STATIC)
            ->withPosition(600)
            ->withSearchKeyWords([
                "newsletter", "unsubscribe", "abbestellen", "kündigen", "cancel"
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
        $settings->createButtonSize();
        $settings->createSpacing(false, true);

        return $settings->toArray();
    }
}
