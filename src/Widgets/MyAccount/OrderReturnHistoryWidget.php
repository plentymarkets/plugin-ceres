<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use Plenty\Plugin\Translation\Translator;

class OrderReturnHistoryWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.OrderReturnHistoryWidget";

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
