<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\SessionStorageService;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;

class OrderHistoryWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $previewData = null;

        if ( $isPreview )
        {
            $statuses = pluginApp(OrderStatusRepositoryContract::class)
                ->all()
                ->where('isFrontendVisible', true);
            $lang = pluginApp(SessionStorageService::class)->getLang();

            $previewData = $this->mockPaginatedResult(
                function($i) use ($statuses, $lang)
                {
                    $status = $statuses->random();
                    return [
                        "id" => $i,
                        "total" => rand(100, 100000) / 100,
                        "status" => $status->names->get($lang),
                        "creationDate" => date("Y-m-d H:i:s")
                    ];
                },
                $widgetSettings["ordersPerPage"]["mobile"] ?? 5

            );
        }

        return [
            "previewData" => $previewData
        ];
    }
}
