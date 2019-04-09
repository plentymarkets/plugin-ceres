<?php

namespace Ceres\Widgets\MyAccount;

use Ceres\Widgets\Helper\BaseWidget;
use IO\Services\SessionStorageService;
use Plenty\Modules\Authorization\Services\AuthHelper;
use Plenty\Modules\Order\Report\KPIs\OrderStatus;
use Plenty\Modules\Order\Status\Contracts\OrderStatusRepositoryContract;

class OrderHistoryWidget extends BaseWidget
{
    private $statuses = null;
    private $lang = null;

    protected $template = "Ceres::Widgets.MyAccount.OrderHistoryWidget";

    protected function getItemsPerPage($widgetSettings)
    {
        return $widgetSettings["ordersPerPage"]["mobile"] ?? 5;
    }

    protected function getTemplateData($widgetSettings, $isPreview)
    {
        $previewData = null;

        if ( $isPreview )
        {
            $previewData = $this->mockPaginatedResult(
                function($i)
                {
                    return [
                        "id"            => $i,
                        "total"         => rand(100, 100000) / 100,
                        "status"        => $this->getRandomStatusName(),
                        "creationDate"  => date("Y-m-d H:i:s")
                    ];
                },
                $widgetSettings["ordersPerPage"]["mobile"] ?? 5

            );
        }

        return [
            "previewData" => $previewData
        ];
    }

    private function getRandomStatusName()
    {
        if ( is_null($this->statuses) )
        {
            $this->statuses = [];
            /** @var AuthHelper $authHelper */
            $authHelper = pluginApp(AuthHelper::class);
            $statuses = $authHelper->processUnguarded(function() {
                return pluginApp(OrderStatusRepositoryContract::class)->all();
            });

            /** @var OrderStatus $status */
            foreach( $statuses as $status )
            {
                if ($status->isFrontendVisible)
                {
                    $this->statuses[] = $status;
                }
            }
            $this->lang     = pluginApp(SessionStorageService::class)->getLang();
        }

        $idx = rand(0, count($this->statuses) - 1);
        $status = $this->statuses[$idx];

        if (isset($status))
        {
            return $status->names[$this->lang];
        }

        return "";
    }
}
