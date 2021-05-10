<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\Settings\ValueListFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;
use Plenty\Plugin\Translation\Translator;

class OrderReturnHistoryWidget extends BaseWidget
{
    /** @inheritDoc */
    protected $template = "Ceres::Widgets.MyAccount.OrderReturnHistoryWidget";

    /**
     * @inheritDoc
     */
    public function getData()
    {
        return WidgetDataFactory::make("Ceres::OrderReturnHistoryWidget")
            ->withLabel("Widget.orderReturnHistoryLabel")
            ->withPreviewImageUrl("/images/widgets/return-history.svg")
            ->withType(WidgetTypes::MY_ACCOUNT)
            ->withCategory(WidgetCategories::MY_ACCOUNT)
            ->withPosition(200)
            ->withSearchKeyWords([
                "order", "return", "history", "retoure", "retourenverlauf"
            ])
            ->withMaxPerPage(1)
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

        $settings->createSelect("returnsPerPage")
            ->withDefaultValue(5)
            ->withName("Widget.orderReturnHistoryOrdersPerPageLabel")
            ->withTooltip("Widget.orderReturnHistoryOrdersPerPageTooltip")
            ->withListBoxValues(
                ValueListFactory::make()
                    ->addEntry(5, "Widget.orderHistoryOrdersPerPage5")
                    ->addEntry(10, "Widget.orderHistoryOrdersPerPage10")
                    ->addEntry(25, "Widget.orderHistoryOrdersPerPage25")
                    ->addEntry(50, "Widget.orderHistoryOrdersPerPage50")
                    ->toArray()
            );

        $settings->createSpacing(false, true);

        return $settings->toArray();
    }

    /**
     * @inheritDoc
     */
    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $previewData = null;

        if ( $isPreview )
        {
            /** @var Translator $translator */
            $translator = pluginApp(Translator::class);
            $previewData = $this->mockPaginatedResult(
                function($i) use ($translator)
                {
                    return [
                        "paymentMethodName" => $translator->trans("Ceres::Widget.orderReturnHistoryMockPaymentMethod", ["i" => ($i + 1)]),
                        "order"             => [
                            "id"         => $i,
                            "createdAt"  => date("Y-m-d H:i:s"),
                            "orderItems" => [],
                            "documents"  => [
                                [
                                    "id"    => rand(0, 100),
                                    "type"  => "return_note"
                                ]
                            ],
                            "itemURLs"   => [],
                            "orderReferences" => [
                                [
                                    "referenceType" => "parent",
                                    "referenceOrderId" => rand(10, 1000)
                                ]
                            ]
                        ]
                    ];
                },
                $widgetSettings["returnsPerPage"]["mobile"] ?? 5

            );
        }

        return [
            "previewData" => $previewData
        ];
    }
}
